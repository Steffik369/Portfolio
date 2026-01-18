// Keeps initial page load from focusing a random element (e.g., first link/button)
// while preserving normal keyboard accessibility afterwards.

window.PortfolioFocus = {
  blurActiveElement: function () {
    try {
      const el = document.activeElement;
      if (!el) return;
      // Don't blur the body/html; only blur real focus targets.
      if (el === document.body || el === document.documentElement) return;
      if (typeof el.blur === 'function') el.blur();
    } catch {
      // no-op
    }
  }
};