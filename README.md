# The Quant Club — Public Website

A standalone multi-page Next.js website for the Quant Club research product. This project is separate from `The Quant Club Website` and contains no private workspace code, strategy returns, ratios, NAVs or holdings.

## Public routes

- `/` — animated universe, customer problems and their solutions, interactive strategy explorer and concrete audience uses
- `/strategies` — filterable public strategy collection with six distinct animated illustrations
- `/strategies/[slug]` — individual strategy introductions
- `/platform` — restored light dashboard-style platform concept, interactive March–September rebalance example and investment workflow
- `/research` — The Quant Journal, with article search and category filters
- `/research/[slug]` — full article pages, contents navigation and related articles
- `/about` — company story, principles and fictional team profiles
- `/institutions` — detailed strategy uses for advisers, fund distributors and institutional research teams
- `/walkthrough` — enquiry form and FAQs; strategy links carry the selected interest into the form

Articles are original editorial samples, not claimed as published company articles. The team names and biographies are explicitly fictional, as requested for the design preview. Replace both with approved content before launch.

## Start on this computer

In PowerShell, run:

```powershell
cd "C:\Users\abhin\OneDrive\Desktop\The Quant Club\Landing Page"
.\start-dev.cmd
```

Open http://localhost:3001. The launcher uses this computer's bundled Node and pnpm. Port 3001 keeps the landing page separate from the workspace on port 3000.

## Standard Node.js environment

```sh
npm install
npm run dev
```

Or use `pnpm install` and `pnpm dev`. A pnpm lockfile is included. Use Node.js 20.9 or newer.

## Checks and production

```sh
npm run typecheck
npm run lint
npm run build
npm run start
```

The production server also uses port 3001. For a host that specifies a different port, invoke `next start -p <port>` using its configuration.

## Design and interactions

- Exact headline: “Investment intelligence built on quants, not opinions.”
- Original Q identity, navy/cobalt/cyan palette and editorial typography
- Rotating universe with an interactive filtering and equal-weight portfolio illustration; faster 3.2s universe / 2.8s filter / 4.2s portfolio sequence, pause controls and reduced-motion support
- Flowing blue SVG ribbons with travelling light traces in the opening section
- Two original generated blue-glass images used in the journal and article covers
- Keyboard-accessible explorer for all original strategies, with distinct uses and model construction context
- Customer problem → solution section before strategy introductions
- Interactive March–September six-month cycle on the Platform page; no financial data
- Six kinetic research prints on navy canvases: a scanned anchor, an expanding fan, selection streams, interwoven market-cap bands, an equal-tile fund mosaic and a shifting sector window. Shared across the explorer, collection and detail pages, including mobile; pause controls, offscreen pausing and reduced-motion support are included.
- Strategy category filters and dedicated detail pages
- Original abstract artwork for each article category
- Searchable, filterable editorial library and full reading layouts
- Specific explanations of methodology, portfolio publications and research review
- Monthly publication process explanation
- Dedicated About Us page, research principles and fictional team profiles
- FAQ accordion on the walkthrough page
- Responsive navigation and footer
- Strategy walkthrough enquiry dialog with validation and a local summary download
- Member-access placeholder dialog

## Current integration boundaries

The enquiry form is a clearly labelled local preview. It validates input and displays an enquiry summary; it does **not** send emails, submit requests, persist details or claim a booking has been made. Connect an approved form endpoint or booking provider before collecting real enquiries, and replace the preview copy with confirmed submission and error states. The file download is initiated only when the visitor chooses to save the summary.

Member login is a placeholder and collects no credentials. The landing page has no links to the unprotected prototype workspace. When connecting authentication, enforce access on the server and limit member views to approved live data; simply hiding public UI is not an access control.

Company registrations, testimonials and contact details were not invented. Team biographies and articles are labelled sample content. Add approved company details and applicable policy pages before public launch.

Fonts are loaded from Google Fonts with local system fallbacks. The rotating universe and animated line ribbons use local canvas and SVG. Two original PNGs under `public/artwork/` were created with built-in image generation and are served through Next Image. Exact generation prompts and provenance are recorded in `public/artwork/ARTWORK.md`. No stock image services or financial chart data are used.

## Main files

- `src/app/page.tsx` — homepage route
- `src/app/layout.tsx` — page metadata and favicon
- `src/app/globals.css` — base styles, fonts and original brand illustration styles
- `src/app/site.css` — multi-page responsive design, typography and component styling
- `src/app/reference.css` — light visual theme, dashboard and responsive reference layout
- `src/components/strategy-home.tsx` + `src/app/strategy-home.css` — homepage and interactive sections
- `src/components/strategy-visual.tsx` + `src/app/strategy-visual.css` — animated research artwork
- `src/components/strategy-character-art.tsx` + `src/app/strategy-character-art.css` — individual strategy animations
- `src/components/research-problems.tsx` + `src/app/research-problems.css` — problems, solutions and strategy-art integration styles
- `src/components/platform-cycle.tsx` + `src/app/platform-cycle.css` — interactive March–September cycle
- `src/components/flow-ribbons.tsx` + `src/app/flow-ribbons.css` — animated opening ribbons and artwork styling
- `src/components/institution-story.tsx` + `src/app/institution-story.css` — audience uses and responsibilities
- `src/components/strategy-platform.tsx` + `src/app/strategy-platform.css` — alternative research workspace layout retained as source; not the active route
- `src/lib/strategy-story.ts` — specific strategy descriptions and audience use cases
- `src/components/reference-home.tsx` — restored Platform page, dashboard preview and shared logo; earlier homepage also retained as source
- `src/components/marketing-site.tsx` — shared shell, public pages and interactive UI
- `src/components/brand-art.tsx` — SVG brand illustration and strategy sculptures
- `src/lib/public-content.ts` — public strategy introductions, sample article content and FAQs
- `src/components/logo.tsx` — original Quant Club logo component
- `public/` — local brand assets

Public copy is intentionally self-contained. Do not import financial datasets from the SaaS project into this landing page.
