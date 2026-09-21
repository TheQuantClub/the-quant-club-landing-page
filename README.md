# The Quant Club public website

A standalone Next.js marketing website for investment advisers, mutual fund distributors, wealth teams and investment institutions. It contains no private model data, holdings, allocations or performance figures.

## Public experience

- `/`: the chosen headline, an interactive six-part workflow, six visual problems and matching Before/After solutions, four audience workflows, The Quant Bytes, credibility FAQs and walkthrough links.
- `/platform`: research, evaluation, deployment, maintenance, branding and communication. Each workflow stage supports direct hash links and keyboard navigation.
- `/strategies` and `/strategies/[slug]`: filterable strategy categories and short public introductions. Model information stays within authorised SaaS access.
- `/institutions`: four distinct workflows for advisers, mutual fund distributors, wealth teams and investment institutions.
- `/research` and `/research/[slug]`: The Quant Bytes, with searchable educational drafts, category filters and reading pages.
- `/about`: the firm's purpose, principles and data foundations.
- `/walkthrough`: booking destination when configured; otherwise an explicitly labelled, non-submitting enquiry draft.

The homepage headline is: “Let rules guide the strategy. Let your brand lead the relationship.”

Rebalance timing is strategy-specific. Deployment means preparing instructions and order files; the professional firm carries out execution. The website does not imply automatic trading or promise investment outcomes.

## Run locally

```powershell
.\start-dev.cmd
```

Open http://localhost:3001. The launcher uses this computer's bundled Node and pnpm. Alternatively:

```sh
pnpm install
pnpm dev
```

## Connect public destinations

Copy `.env.example` to `.env.local` and set the approved destinations:

```dotenv
NEXT_PUBLIC_MEMBER_LOGIN_URL=
NEXT_PUBLIC_WALKTHROUGH_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
```

These variables are public and are included at build time. Rebuild after changing them.

Without a member URL, the login button explains that sign-in is not connected. It collects no credentials and does not link to an unprotected prototype. The destination SaaS must enforce its own authentication and authorisation.

Without a booking URL, the walkthrough form validates fields, prepares a local draft and lets the visitor download it. It does not submit, email, store or confirm a booking. When a contact email is configured, an optional mailto action lets the visitor compose the draft in their own email application.

## Content provenance

Data-source, CA-firm audit and PaRRVA tracking copy reflects details supplied by the project owner. No auditor identity, audit report, registration number, regulatory endorsement or return guarantee has been invented. Detailed research remains outside this public repository.

The Quant Bytes articles are proposed educational copy and are marked as editorial drafts. No fictional team profiles, publication dates or testimonials appear on the active pages.

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

Development and production servers use port 3001 by default. Local browser QA and screenshots live under ignored `qa/`.

## Active implementation

- `src/components/marketing-site.tsx`: shared shell, secondary pages and enquiry flow.
- `src/components/strategy-home.tsx`: homepage and shared closing section.
- `src/components/business-orbit.tsx`: six-part workflow with offscreen pausing, manual selection and reduced-motion support.
- `src/components/research-problems.tsx`: shared problem/solution scenes with matching animated objects.
- `src/lib/business-content.ts`: offering and audience copy.
- `src/lib/public-content.ts`: strategy overviews, educational drafts and FAQs.
- `src/app/brand-refresh.css`, `marketing-refresh.css`, `research-problems.css`: current public-page styling, alongside base `globals.css`.

Earlier design components and styles remain as inactive source references. They are not imported by the active public-page tree. Existing strategy/article URLs are retained for compatibility.
