# $RH-18932 — Robinhood Chain Deep Space Desk

Static orbital tracker for asteroid 18932 Robinhood (2000 QH35). No build step,
no production dependencies — plain HTML/CSS/JS with canvas rendering.

## Local development

Needs Node.js. From this folder:

    npm install
    npm run dev

That starts a Vite dev server (live reload) serving this folder as-is on
http://localhost:5180/. Vite is a dev-only dependency — do not run a Vite
build for deploy. Production on Render still publishes the raw files with
no build step (`publish directory: .`).

## Files

- `index.html` — the whole app
- `assets/logo.png` — badge logo (also used as favicon and og:image)
- `render.yaml` — Render blueprint (optional, dashboard setup works too)
- `package.json` / `vite.config.js` — `npm run dev` only; not used in production

## Deploy to Render

1. Push this folder to a GitHub/GitLab repo (repo root = this folder).
2. In the Render dashboard: New → Static Site → connect the repo.
3. Settings:
   - Build command: leave blank
   - Publish directory: `.`
4. Deploy. Static sites are on Render's free tier and get a
   `*.onrender.com` URL; add a custom domain in Settings → Custom Domains
   if you want to hang it off one of your project domains.

Alternatively, with `render.yaml` in the repo you can use New → Blueprint
and Render picks up the config automatically.

## Orbital elements

On page load the app fetches full-precision elements from the JPL SBDB API
(CORS enabled, no key):

    https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=18932&full-prec=true

The tracker renders immediately from cached solution-60 values, then updates
the six inputs and epoch when the fetch succeeds. `npm run dev` proxies that
request through Vite so live data works on localhost. A production static
deploy calls JPL directly; if the browser blocks it (CORS, offline, timeout,
API change), the cached values stay and the elements panel says so. Edits in
the panel still recalculate live.
