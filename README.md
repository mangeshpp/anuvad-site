# Anuvad Software Solutions — website

The corporate and product site for [anuvadsoftware.com](https://www.anuvadsoftware.com), rebuilt in React.
Replaces the Wix site, keeps its positioning ("Data that drives decisions. Not doubts.") and adds a full
product catalogue for the five platforms Anuvad now sells.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · lucide-react

No backend. `npm run build` produces a static `dist/` that any web server can host.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build locally
```

Node 18 or newer.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, stats, services, products, process, featured case study |
| `/services` | Six capabilities with what each includes, engagement models, stack |
| `/products` | All five products, grouped by domain, plus a comparison table |
| `/products/:slug` | Product detail — problem, solution, capabilities, specs, pricing |
| `/case-studies` | Media intelligence platform, report consistency checking |
| `/about` | Company, history, principles |
| `/contact` | Enquiry form and direct contact details |

Product slugs: `akhani`, `fiscora`, `brimline`, `returnloop`, `warehouse-inventory`.

## Editing content

**All copy lives in `src/data/` — you do not need to touch a component to change the site.**

| File | What it holds |
|---|---|
| `src/data/site.js` | Company details, tagline, stats, process, differentiators, engagement models |
| `src/data/services.js` | The six service cards and their bullet points |
| `src/data/products.js` | The five products: hero copy, features, specs, plans, external URLs |
| `src/data/caseStudies.js` | Case studies with challenge, approach, outcomes and stack |

To add a sixth product, append an object to `products` in `src/data/products.js` — it appears in the navbar
dropdown, the home page rail, the products page, the comparison table, the footer and gets its own detail
route automatically.

Set `url` to `null` on a product with no public site of its own; the "Visit site" links then disappear
rather than breaking.

## Homepage animation

The homepage carries a motion layer; content and layout are the same as a plain page:

- hero background: five separate data "silos" whose points fly onto a 3D geodesic data globe, which then
  turns a full 360° continuously (about 30 s per turn) with two orbit rings, travelling signals and a gentle
  tilt toward the cursor; the product panel is frosted glass so the globe reads through it
- headline words rise in; "Not doubts." carries a slow shimmer
- stats and case-study figures count up when scrolled into view
- sections and cards reveal on scroll, staggered
- cards glow and light their edge under the cursor
- process steps fill left-to-right like a progress line
- the closing call-to-action has a travelling light border
- a thin scroll-progress line along the top

Notes:

- honours the visitor's reduced-motion setting: everything is shown immediately and the globe is drawn once, still
- the globe pauses when scrolled off screen or when the tab is hidden, and costs about 1 ms per frame to draw
- all motion CSS is scoped under `.motion-root`, so other pages are unaffected
- files: `src/pages/Home.jsx` and `src/components/motion/`
- `/preview`, where this was reviewed, now redirects to `/`. `src/pages/HomePreview.jsx` is no longer used and
  can be deleted.

## Contact form

By default the form composes a pre-filled email and opens the visitor's mail client. That always works and
never silently loses a lead.

To capture submissions instead, copy `.env.example` to `.env` and set:

```
VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/.../exec
```

It posts JSON (`name`, `email`, `company`, `interest`, `message`, `submittedAt`, `source`) with
`mode: 'no-cors'`, which is what a Google Apps Script web app expects. A hidden honeypot field blocks
the usual bots.

## Deploying to the Hostinger VPS

The VPS at `82.25.112.1` already runs fiscora.tech; this site is a second Nginx server block on the same
machine.

```bash
npm run build
rsync -avz --delete dist/ root@82.25.112.1:/var/www/anuvadsoftware/
```

or just `./deploy/deploy.sh`.

Server config:

- `deploy/nginx.conf` — server block with the SPA fallback (`try_files ... /index.html`), asset caching
  and gzip. Copy to `/etc/nginx/sites-available/`, symlink into `sites-enabled/`, `nginx -t`, reload.
- `deploy/.htaccess` — the Apache equivalent, if the site ends up on shared hosting instead.
- `public/_redirects` — the Netlify/Cloudflare Pages equivalent, already in the build output.

**The SPA fallback is not optional.** Without it, `anuvadsoftware.com/products/akhani` returns 404 on a hard
refresh even though it works when navigated to from within the site.

### DNS

`anuvadsoftware.com` is currently on Wix nameservers. Before the VPS can serve it — and before certbot can
issue a certificate — point the domain at `82.25.112.1`, either by moving the nameservers or by changing
the A records for `@` and `www`.

Subdomains:

| Host | Serves |
|---|---|
| `akhani.anuvadsoftware.com` | Akhani — TV Spot Scheduler Pro |
| `brimline.anuvadsoftware.com` | Brimline — reach efficiency |
| `fiscora.tech` | Fiscora — accounting platform (already live on this VPS) |

Each needs its own Nginx server block; `deploy/nginx.conf` has a commented template at the bottom.
The Hostinger plan allows five published sites.

## Notes on the content

**The public pages carry no technology names.** No stack, no architecture, no library names — buyers are
media planners, finance heads and operations managers, and a spec sheet is noise to them. Each product page
answers four questions instead: what problem this solves, how you use it, what it gives you, and what changes
once you have it. The `atAGlance` panel is deliberately phrased as *you bring / you get back / getting
started*, not *frontend / backend / database*.

Keep that rule when editing `src/data/`. Technical detail belongs in a proposal or a security review, on
request — not on a page someone is skimming to decide whether to book a call.

Product copy itself was written from the real build documentation, so the claims hold up. Where a figure is
indicative rather than measured, the wording says so.

Two things worth a review pass before launch:

1. **Testimonials.** There are none on the site. The old Akhani landing page carried invented ones; they are
   not reproduced here. Add real quotes when you have client permission.
2. **Pricing.** Akhani's tiers are the real published ones. The other four say "On request" — fill them in
   if you would rather lead with a number.
