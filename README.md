# Bhaveshsingh Rathod — Portfolio

A React + Vite + Tailwind portfolio site. No backend, fully static — deploys to GitHub Pages or Netlify in minutes.

## Edit content

Almost everything you'll want to change lives in one file:

```
src/data/content.js
```

That's your name, bio, links, skills, projects, certifications, education, and experience. Edit the text there — you generally won't need to touch component files unless you want to change layout.

**Before you deploy, update these in `content.js`:**
- `profile.linkedin` — currently a placeholder
- `profile.github` — currently a placeholder
- Add real GitHub repo / write-up links under each project's `links` array

Your resume PDF lives at `public/resume.pdf` — replace that file directly to update the downloadable resume (keep the filename the same, or update `profile.resumeFile` in `content.js`).

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy to Netlify (easiest)

1. Push this folder to a GitHub repo.
2. Go to netlify.com -> "Add new site" -> "Import an existing project" -> pick your repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. Netlify gives you a free `*.netlify.app` URL; you can attach a custom domain later in site settings.

## Deploy to GitHub Pages

1. Install the deploy helper:
   ```bash
   npm install -D gh-pages
   ```
2. In `package.json`, add:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. If deploying to `<username>.github.io/<repo-name>` (not a root user site), also set the base path in `vite.config.js`:
   ```js
   export default defineConfig({
     base: "/<repo-name>/",
     plugins: [react()],
   })
   ```
4. Run:
   ```bash
   npm run deploy
   ```
5. In your repo's Settings -> Pages, set the source branch to `gh-pages`.

If you use a custom domain or deploy to `<username>.github.io` directly (repo named exactly that), you can skip the `base` path change.

## Structure

```
src/
  components/   -> one file per section (Hero, Projects, Skills, etc.)
  data/
    content.js  -> all editable text/content
  index.css     -> design tokens + global styles
  App.jsx       -> page assembly
public/
  resume.pdf    -> downloadable resume
  favicon.svg
```
