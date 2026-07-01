# RetroTech Renewal — Quality Audit Report

**Date:** 21 May 2026
**Scope:** Initial codebase review and remediation
**Status:** ✅ All findings resolved

---

## Audit method

The codebase was put through four lenses, in this order:

1. **TypeScript strict-mode check** with `noUncheckedIndexedAccess` enabled
2. **ESLint** with `@typescript-eslint`, `react`, `react-hooks`, `jsx-a11y` plugin sets
3. **Manual code review** for UX correctness, semantic HTML, and architectural smell
4. **Bundle analysis** of the production build output

---

## Findings and fixes

### Bugs

| # | Severity | Finding | Location | Status |
|---|---|---|---|---|
| 1 | Bug | `machinesById[selectedId]` could return `undefined` — would crash if data drift ever produced a missing ID | `DashboardPage.tsx` | ✅ Fallback to first machine; empty-state UI for no-machines case |
| 2 | Bug | Array index access on synthetic telemetry not guarded against `undefined` | `lib/telemetry.ts` | ✅ Default to baseline value if generator misbehaves |

Both bugs were latent — they would only have surfaced in an edge case where the data was malformed. `noUncheckedIndexedAccess` is now permanently enabled in `tsconfig.json` so the same class of bug cannot recur silently.

### Code quality

| # | Issue | Resolution |
|---|---|---|
| 3 | `AlertsPanel` used `dangerouslySetInnerHTML` for inline markdown rendering, with an `eslint-disable` suppression | Introduced `<InlineMarkdown>` component that parses bold and line breaks into proper JSX. No more raw HTML insertion. |

### UX correctness

| # | Issue | Resolution |
|---|---|---|
| 4 | `MachineDetailPanel` metric arrows were hardcoded — a healthy machine still displayed "+14.3% baseline" in red | Trends now derive from machine status via a `trendsFor()` map; idle machines display em-dashes for primary metrics |
| 5 | Detail tabs were decorative — clicking changed the visual highlight but the chart never updated | Tabs now drive a `variant` prop on `DetailChart`; each tab renders its own series (current, vibration, temperature, cycles, history) with appropriate units and thresholds |

### Accessibility

| # | Issue | Resolution |
|---|---|---|
| 7 | Alert items had pointer cursor but no button semantics — invisible to keyboard and screen readers | Refactored to semantic `<ul><li><button>` with `aria-label` summarising severity + machine + title |
| 8 | Decorative sparklines on KPI cards were read by screen readers | Wrapped in `aria-hidden` element |
| (auto) | Tab navigation used `<nav role="tablist">` — invalid pairing per `jsx-a11y` | Switched to `<div role="tablist">` |

All interactive elements now have visible focus-ring styling (`focus-visible:outline`) for keyboard navigation.

### Performance

| # | Issue | Resolution |
|---|---|---|
| 6 | Single 574 KB JS bundle — every app code change invalidated the entire bundle in user caches | Added `manualChunks` to `vite.config.ts` splitting into `vendor-react`, `vendor-charts`, `vendor-icons`, and the app code. Main app chunk dropped from 574 KB to 35 KB. |

### Test coverage

| # | Issue | Resolution |
|---|---|---|
| 9 | Zero automated tests | Vitest + React Testing Library added. 18 tests across 4 files covering Italian formatters, telemetry generator (including bug #2 regression guard), `<InlineMarkdown>` (including XSS safety), and `<StatusDot>` |

---

## Verification

Every step is reproducible:

```bash
npm run lint          # 0 errors, 0 warnings
npx tsc --noEmit      # clean
npm test              # 18 tests, all passing
npm run build         # clean build, 4 chunks, no warnings
```

---

## What was not addressed

These were considered and deliberately deferred — none affect correctness:

- **Visual regression tests / Storybook** — over-investment for a prototype; would matter at production scale
- **i18n framework (e.g. `react-i18next`)** — currently all strings are Italian-only by design; would matter when EU expansion (year 3-5) adds other languages
- **Backend integration** — the mock data layer in `src/data/` is the intentional contract surface; documented in README
- **End-to-end tests (Playwright / Cypress)** — same reasoning as Storybook
- **Bundle size minimization beyond chunking** — Recharts is the dominant 528 KB. Trade-off for chart richness; would only revisit if mobile-first becomes a priority

---

## Files added/modified during the QA pass

**Added:**
- `.eslintrc.cjs`
- `src/test/setup.ts`
- `src/components/ui/InlineMarkdown.tsx`
- `src/components/ui/InlineMarkdown.test.tsx`
- `src/components/ui/StatusDot.test.tsx`
- `src/lib/format.test.ts`
- `src/lib/telemetry.test.ts`
- `QA_REPORT.md` (this file)

**Modified:**
- `tsconfig.json` — added `noUncheckedIndexedAccess`
- `vite.config.ts` — added manual chunks + Vitest config
- `package.json` — added test scripts and dev dependencies
- `src/components/dashboard/DashboardPage.tsx` — fallback for missing machine ID
- `src/components/dashboard/MachineDetailPanel.tsx` — status-aware metrics, functional tabs, ARIA
- `src/components/dashboard/AlertsPanel.tsx` — proper button semantics, no `dangerouslySetInnerHTML`
- `src/components/dashboard/DetailChart.tsx` — variant prop for tab-driven views
- `src/components/ui/Sparkline.tsx` — `aria-hidden`
- `src/lib/telemetry.ts` — index-access safety
- `src/lib/format.ts` — removed obsolete `renderInlineMarkdown`
