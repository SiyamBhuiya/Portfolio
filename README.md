# Siyam portfolio (React + Vite)
    npm install
    npm run dev       # local preview
    npm run build     # static site in dist/ (HashRouter, works on any static host)

Edit your email, name and all project text in `src/data.js`. Pages are in `src/pages.jsx`, styles in `src/styles.css`.

Retro page: export the Figma design as PNG, save it as `src/assets/retro-device.png` and it appears at `#/retro`.

CV: save your PDF as `public/Siyam-CV.pdf`. The site shows a View button (opens in a new tab) and a Download button.
Workflow screenshots: save a cleaned n8n canvas image as `src/assets/shots/<project-slug>.png` (for example `meeting-scheduling.png`). To link workflow files, add `repo: 'https://github.com/...'` to a project in `src/data.js`.

Workflows: each project in `src/data.js` lists `workflows` with an id. For id `x`, add `src/assets/shots/x.png` and `src/workflows/x.json` and they show on that project page (click a screenshot to enlarge; JSON can be downloaded or copied). Use `tool: 'Make'` for Make blueprints.
Clean every export before adding it: remove credentials, pinned data, webhook URLs, emails, phone numbers and client names.
