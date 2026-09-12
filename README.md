# AMSA Website

Applied Mechanics Student Association website. Built with Vite, React (TypeScript), and Tailwind CSS v4.

## Project Structure

This project follows a strict separation of concerns, separating content from design.

- `/public` - Publicly accessible static assets, logos, and documents
- `/src`
  - `/components` - Reusable React UI components
  - `/data` - Centralized content in JSON (about, team, events, gallery, announcements, contact, etc.)
  - `/layouts` - Webpage layout templates (`MainLayout`, `StudentHubLayout`)
  - `/pages` - Routing and page components (`Home`, `About`, `Team`, `Events`, `Collaborations`, `Gallery`, `Student Hub`, `Contact`, `NotFound`)
  - `/styles` - Global design tokens, theme colors, typography, and animations
  - `/utils` - Utility helper functions (`assetPath`, `dateFormatting`, `eventSorting`)

## Available Scripts

- `npm run dev` — Start the local development server with HMR at `http://localhost:5173`.
- `npm run build` — Compile TypeScript and bundle optimized static assets into the `dist/` directory.
- `npm run preview` — Locally preview the production build in `dist/`.
- `npm run typecheck` — Run TypeScript type checking across all project files.

## Deployment to GitHub Pages

The repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for AMSA website"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPONAME>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger on push to `main`, build the application, and publish it to GitHub Pages.
5. Your website will be live at `https://<USERNAME>.github.io/<REPONAME>/` (or your custom domain).
