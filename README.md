# Portfolio (Blazor WebAssembly)

Simple single-page portfolio/resume built with Blazor WebAssembly.

## Local run

```bash
cd Portfolio

dotnet restore

dotnet run
```

## Deployment (GitHub Pages)

This repo includes a GitHub Actions workflow that publishes the app and deploys it to GitHub Pages.

1. Push to GitHub (default branch `main`).
2. In GitHub repo settings:
   - **Settings → Pages**
   - **Build and deployment → Source**: select **GitHub Actions**
3. The workflow will publish to `https://<username>.github.io/<repo-name>/`.

### Notes
- The workflow rewrites `<base href="/">` to `<base href="/<repo-name>/">` for Pages.
- Replace `Portfolio/wwwroot/images/avatar.jpg` with your real photo.
- Replace `Portfolio/wwwroot/resume/Zbynek-Novak-Resume.pdf` with the final PDF anytime.