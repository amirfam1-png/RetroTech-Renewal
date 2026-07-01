# RetroTech Renewal — Operations Console

Production-quality MVP of the **RetroTech Renewal** SaaS platform for Italian
metalmechanic SMEs. Built for the BTP (Business Transformation Project) at
Politecnico di Milano Graduate School of Management.

The MVP includes a public landing page, a demo login flow, a multi-tenant
operations dashboard, and a one-click PDF report generator that produces an
Iperammortamento 2026 compliance document. It runs against a realistic mock
data layer drawn from a real customer interview (Molina S.r.l., Varese).

## What's inside

| Route | Page | What it does |
|---|---|---|
| `/` | Landing | Italian-language marketing site — hero, problem stats, six-feature grid, three-tier pricing, customer testimonial |
| `/login` | Login | Split-screen sign-in with Valerio Molina's credentials pre-filled — single click enters the demo |
| `/app` | Dashboard | Live operations console — 12 machines (Molina) or larger fleets for the two demo customer sites; site switcher in the topbar swaps customer in real time |

The dashboard ships with three pre-configured customer sites accessible
through the topbar selector:

- **Molina S.r.l.** (Varese, 8 employees, mould-making) — 12 machines
- **Officine Bianchi S.r.l.** (Bergamo, 14 employees, precision mechanics) — 6 machines
- **Stampi Lombardia S.p.A.** (Brescia, 42 employees, automotive moulds) — 9 machines

## Tech stack

| Layer            | Choice                           | Why                                                      |
| ---------------- | -------------------------------- | -------------------------------------------------------- |
| Framework        | React 18 + TypeScript (strict)   | Industry-standard, type-safe component model             |
| Build tool       | Vite 5                           | Fast dev server, modern ESM, lean prod build             |
| Routing          | React Router v6                  | SPA routing for landing / login / dashboard              |
| Styling          | Tailwind CSS 3 + design tokens   | Single source of truth for the industrial palette        |
| Charts           | Recharts                         | Declarative SVG charts, plays well with React            |
| Icons            | lucide-react                     | Cohesive, professional, tree-shakeable                   |
| PDF              | @react-pdf/renderer              | Real client-side PDF generation, lazy-loaded             |
| Typography       | IBM Plex Sans / Serif / Mono     | Industrial heritage, freely licensed via Google Fonts    |
| Tests            | Vitest + React Testing Library   | 18 tests covering formatters, telemetry, components      |

## Getting started

```bash
npm install          # install dependencies
npm run dev          # open http://localhost:5173
npm run build        # production build
npm run preview      # preview the production build
npm test             # run the test suite
npm run lint         # static analysis
```

Node.js 18+ is required.

## Deploying to Vercel (recommended for the BTP demo)

The project ships with a `vercel.json` that handles SPA routing. To deploy:

1. Push the project to a GitHub repository
2. Sign in to [vercel.com](https://vercel.com) and click **Add New → Project**
3. Import the repository — Vercel will auto-detect Vite settings
4. Click **Deploy** (no environment variables needed for the prototype)
5. You'll get a URL like `retrotech-renewal.vercel.app` ready for the demo

Every subsequent push to `main` triggers an automatic redeploy. The free
Hobby plan is more than sufficient for the demo's traffic.

Alternative deployment targets: Netlify (use the same `_redirects`
single-line equivalent), Cloudflare Pages, GitHub Pages (with hash routing
workaround), or any static-file host.

## PDF report generation

Clicking **Genera report Iperammortamento** in the Energy & sustainability
panel of the dashboard generates a 4-page PDF compliance document tailored
to the currently selected site:

1. Cover with site identification, period, and a "qualified for
   Iperammortamento 2026" seal
2. Executive summary with three KPI cards and a qualitative narrative
3. Per-machine consumption table with baseline-vs-current deltas
4. Methodology, data sources, limitations, and sign-off block

The `@react-pdf/renderer` library is dynamically imported on first click,
so it never bloats the dashboard's initial load.

## Project structure

```
src/
├── App.tsx                      Root router + SiteProvider
├── main.tsx                     React entry point
├── index.css                    Tailwind base + global styles
├── context/
│   └── SiteContext.tsx          Multi-tenant state (selected customer)
├── routes/
│   ├── LandingRoute.tsx         Public marketing page
│   ├── LoginRoute.tsx           Demo sign-in
│   └── DashboardRoute.tsx       Dashboard route wrapper
├── components/
│   ├── layout/                  TopBar (site selector, user menu), Sidebar, AppShell
│   ├── ui/                      Reusable primitives (Panel, KpiCard, …)
│   ├── dashboard/               Feature components for the dashboard
│   └── pdf/
│       └── IperammortamentoReport.tsx
├── data/
│   ├── machines.ts              Molina's fleet (12 machines from Valerio interview)
│   ├── sites.ts                 Three customer sites (multi-tenancy)
│   ├── alerts.ts                Claude-generated AI alerts (mock)
│   ├── predictions.ts           Vertex AI predictive maintenance horizon (mock)
│   └── kpis.ts                  Top-row KPI definitions
├── hooks/                       useLiveClock, useLiveReadings
├── lib/                         cn(), telemetry generator, formatters, status maps
└── types/                       TypeScript interfaces for the domain model
```

## Quality gates

All four enforced gates pass:

- **TypeScript strict** with `noUncheckedIndexedAccess` — zero `any`, zero unguarded array access
- **ESLint** (`@typescript-eslint`, `react`, `react-hooks`, `jsx-a11y`) — zero warnings
- **Vitest** with React Testing Library — 18 tests
- **Production build** — split into vendor chunks for cache efficiency (main app chunk ~35 KB gzipped)

See `QA_REPORT.md` for the full audit log.

## Demo script for the BTP defence

Roughly 4-5 minutes:

1. **Open the landing page** — establish the value proposition
2. **Click "Prova la demo" → /login** — show the customer-onboarding flow
3. **Click "Accedi"** with the pre-filled Valerio credentials → dashboard
4. **Dashboard overview** — 12 machines connected, 3 alerts, 73.4% OEE
5. **Click "Pressa Harburg 100T #2"** — show the troubled-machine view, current draw 14% above baseline
6. **Open the Claude Sonnet 4.6 alert** — show the Italian-language AI narrative with cost-of-delay quantification
7. **Open the predictive maintenance panel** — Vertex AI horizon
8. **Click "Genera report Iperammortamento"** — PDF downloads, demonstrating the Claude Opus 4.7 ESG-reporting integration
9. **Switch customer via the topbar site selector** — show that the multi-tenant story holds, dashboard repopulates for a different site

## Swapping mock data for a real backend

The mock layer is intentionally isolated. To connect a real backend:

1. Replace the synthetic generator in `src/lib/telemetry.ts` with a fetch /
   WebSocket / SSE call to the gateway or cloud telemetry API
2. Replace the static arrays in `src/data/` with API responses (the types in
   `src/types/` already define the contract)
3. Add a state layer (TanStack Query is the natural choice) if you cross
   roughly five endpoints

## License

Prototype code for an academic project. Not licensed for commercial reuse.
