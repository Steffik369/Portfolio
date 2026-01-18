// PDF export helper for the resume page.
// Uses html2canvas + jsPDF to capture a DOM element and download it as a PDF.
//
// Exposed as window.PdfExport.downloadResumePdf(selector, filename)

(function () {
  function assertLib(name, obj) {
    if (!obj) {
      throw new Error(name + " is not loaded. Check script includes in index.html");
    }
  }

  function nextFrame() {
    return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  }

  function toAbsoluteUrl(url) {
    try {
      return new URL(url, document.baseURI).toString();
    } catch {
      return url;
    }
  }

  async function waitForImages(root, timeoutMs) {
    const imgs = Array.from((root || document).querySelectorAll("img"));
    if (imgs.length === 0) return;

    const timeout = timeoutMs ?? 4000;

    await Promise.race([
      Promise.all(
        imgs.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete && img.naturalWidth > 0) return resolve();
              const done = () => {
                img.removeEventListener("load", done);
                img.removeEventListener("error", done);
                resolve();
              };
              img.addEventListener("load", done);
              img.addEventListener("error", done);
            })
        )
      ),
      new Promise((r) => setTimeout(r, timeout)),
    ]);
  }

  function fixImageUrls(root) {
    const imgs = Array.from((root || document).querySelectorAll("img"));
    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (!src) continue;
      // Ensure base-href relative paths (GitHub Pages) become absolute for canvas capture.
      img.setAttribute("src", toAbsoluteUrl(src));
      img.crossOrigin = "anonymous";
    }
  }

  function getPageSizeMm(pdf) {
    return {
      w: pdf.internal.pageSize.getWidth(),
      h: pdf.internal.pageSize.getHeight(),
    };
  }

  /**
   * Export a selector to a multi-page A4 PDF.
   * We capture ONLY the resume sheet (layout stays perfect), but we render a stable background behind it.
   */
  async function downloadResumePdf(selector, filename) {
    const file = filename || "resume.pdf";

    const target = document.querySelector(selector || ".sheet");
    if (!target) {
      const err = new Error("Export target not found. Selector: " + (selector || ".sheet"));
      console.error("[PdfExport]", err);
      throw err;
    }

    assertLib("html2canvas", window.html2canvas);
    assertLib("jsPDF", window.jspdf);

    const { jsPDF } = window.jspdf;

    // Freeze animations during capture (stars/aurora can break rasterization)
    const prevHtmlClass = document.documentElement.className;
    document.documentElement.classList.add("pdf-capture");

    let wrapper = null;

    try {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
      } catch {
        // ignore
      }

      // Create an off-screen wrapper that includes a background + a clone of the sheet.
      // This keeps the on-screen layout untouched and avoids clipping from scroll containers.
      const rect = target.getBoundingClientRect();

      wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-100000px";
      wrapper.style.top = "0";
      wrapper.style.width = rect.width + "px";
      wrapper.style.padding = "0";
      wrapper.style.margin = "0";

      // Use a stable background similar to the app. (Exact aurora/stars are hard to reproduce reliably.)
      wrapper.style.background = "#0b0f1a";

      // Give it some breathing room so the glow isn't clipped.
      const pad = 18;
      wrapper.style.padding = pad + "px";

      const clone = target.cloneNode(true);
      // Ensure the clone isn't clipped.
      clone.style.overflow = "visible";

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Fix any base-href-relative images so html2canvas can fetch them reliably.
      fixImageUrls(wrapper);
      await waitForImages(wrapper, 6000);

      await nextFrame();

      // Capture the wrapper
      const scale = Math.min(2, window.devicePixelRatio || 1);
      const captureWidth = Math.ceil(wrapper.getBoundingClientRect().width);
      const captureHeight = Math.ceil(wrapper.getBoundingClientRect().height);

      const canvas = await window.html2canvas(wrapper, {
        backgroundColor: null,
        useCORS: true,
        // allowTaint can break exporting on some hosts if any asset is considered cross-origin.
        allowTaint: false,
        scale,
        scrollX: 0,
        scrollY: 0,
        width: captureWidth,
        height: captureHeight,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
      });

      // Multi-page A4 PDF slicing (no cropping): slice the captured canvas into A4-height chunks.
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const { w: pageW, h: pageH } = getPageSizeMm(pdf);
      const margin = 6;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;

      const imgWpx = canvas.width;
      const imgHpx = canvas.height;

      const pxPerMm = imgWpx / contentW;
      const pageHpx = Math.max(1, Math.floor(contentH * pxPerMm));

      // Use JPEG to avoid alpha issues in Preview.app
      pdf.setFillColor(255, 255, 255);

      let page = 0;
      for (let sy = 0; sy < imgHpx; sy += pageHpx) {
        const sliceH = Math.min(pageHpx, imgHpx - sy);

        // Always use a full page-height slice canvas to avoid last-page clipping.
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = imgWpx;
        sliceCanvas.height = pageHpx;

        const ctx = sliceCanvas.getContext("2d");
        if (!ctx) throw new Error("Unable to create 2D canvas context");

        ctx.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, sy, imgWpx, sliceH, 0, 0, imgWpx, sliceH);

        const sliceImg = sliceCanvas.toDataURL("image/jpeg", 0.92);

        if (page > 0) pdf.addPage();

        pdf.rect(margin, margin, contentW, contentH, "F");
        pdf.addImage(sliceImg, "JPEG", margin, margin, contentW, contentH, undefined, "FAST");

        page++;
      }

      pdf.save(file);
    } catch (e) {
      console.error("[PdfExport] PDF export failed", e);
      // Throw a useful message up to Blazor
      const msg = (e && (e.message || e.toString())) || "Unknown error";
      throw new Error("PdfExport failed: " + msg);
    } finally {
      // Cleanup always
      if (wrapper) wrapper.remove();
      document.documentElement.className = prevHtmlClass;
    }
  }

  window.PdfExport = {
    downloadResumePdf,
  };
})();