# SpendGuard — Master Rebuild Prompt

---

## Context

You are working on **SpendGuard AI**, a billing intelligence dashboard built with:
- React 19 + Vite 8
- Tailwind CSS 4 (configured via `@import "tailwindcss"` in index.css, no tailwind.config.js)
- Recharts 3 for charts
- lucide-react for icons
- Plain JavaScript (no TypeScript)

The app has 5 components: `App.jsx`, `Sidebar.jsx`, `MetricsHeader.jsx`, `BillingChart.jsx`, `AnomalyFeed.jsx`, `IntegrationPortal.jsx`.

---

## Task

Improve and extend the existing codebase by applying ALL of the following changes in one pass. Do not change any design tokens, color palette, or visual style unless explicitly instructed. Preserve all existing animations, hover effects, and Tailwind class patterns.

---

## Bug Fixes (apply first)

### 1. Fix chart data regenerating on every render — `BillingChart.jsx`
The three generator functions (`generateOpenAI`, `generateAWS`, `generateStripe`) are called at module level inside the `PROFILES` array constant. Move the data into `useMemo` so it's stable across hot reloads. Each profile's data should be memoised independently.

### 2. Fix sidebar tabs that do nothing — `App.jsx`
`activeTab` state is tracked but never used to switch content. Add a view switcher:
- `overview` → current dashboard layout (unchanged)
- `integrations` → full-page `IntegrationPortal` with a larger header and an "Add Integration" modal stub
- `audit` → a new `AuditLogs` component: a mock table with columns Date, Vendor, Event, Amount, Status. Populate with 8 realistic rows (e.g. "OpenAI API key rotated", "AWS billing spike +340%", "Stripe fee waiver applied"). Status badges: Resolved (emerald), Flagged (rose), Pending (amber).
- `settings` → a new `Settings` component with sections: Notification Preferences (3 toggles), Budget Limits (3 editable number inputs for OpenAI, AWS, Stripe caps), Team Members (2 mock user rows with role badges).

### 3. Fix duplicate value in Guardrail KPI card — `MetricsHeader.jsx`
The `guardrail` card renders `dyn.value` ("Active Scanning") twice — once in the badge and once as the large bottom text. Replace the large bottom text with `"4 rules active"` when alerts exist, or `"0 rules active"` when empty. Keep the badge label as-is.

---

## Code Quality Improvements

### 4. Refactor MetricsHeader card render — `MetricsHeader.jsx`
The `.map()` has three near-identical `return` blocks. Extract a single internal `KpiCard` component that accepts: `icon`, `label`, `colorKey`, `badge` (optional ReactNode), `children` (bottom value slot). Replace all three conditional returns with a single `<KpiCard>` render. Visual output must be pixel-identical.

### 5. Make the budget cap user-editable — `BillingChart.jsx`
Replace the hard-coded `budgetCap = 4000` with `useState(4000)`. When Auto-Kill is toggled ON, show a small inline number input directly after the toggle label (prefix with `$`, input width ~80px, styled to match the existing dark input aesthetic: `bg-slate-800/60 border border-slate-700/60 rounded-lg text-sm text-slate-200 px-2 py-1`). The `ReferenceLine` and the warning banner below the chart must update in real-time. Only accept positive numbers; ignore invalid input.

---

## New Features

### 6. Mobile responsiveness — `App.jsx` + `Sidebar.jsx`
On screens below `md` (768px):
- Hide the sidebar (`hidden md:flex`)
- Add a top navbar (height 56px, `bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80`) containing the SpendGuard logo left and a hamburger `Menu` icon (lucide) right
- Clicking the hamburger opens the Sidebar as a left-side drawer with a `fixed inset-0 z-40` dark overlay (`bg-black/60`) behind it; clicking the overlay closes it
- Main content padding changes to `p-4` on mobile, `p-8` on desktop
- KPI cards grid: `grid-cols-2` on `sm`, `grid-cols-4` on `lg`
- `BillingChart` and `AnomalyFeed` stack vertically on mobile (`grid-cols-1`), side-by-side on `lg` (`lg:grid-cols-3` with `lg:col-span-2` / `lg:col-span-1` as before)

### 7. Spend breakdown donut chart — new `SpendBreakdown.jsx`
Create a new component using Recharts `PieChart` in donut mode (`innerRadius={70}` `outerRadius={110}`). Data:
```js
[
  { name: 'OpenAI Infrastructure', value: 4200, color: '#3b82f6' },
  { name: 'AWS Compute',           value: 3100, color: '#f59e0b' },
  { name: 'Stripe Fees',           value: 2800, color: '#10b981' },
  { name: 'SaaS Seats',            value: 2400, color: '#8b5cf6' },
  { name: 'Other',                 value: 1740, color: '#64748b' },
]
```
- Render a custom legend below the chart: colored dot + name + dollar value + percentage
- Center label inside the donut showing total spend (`$14,240`) in large white text with "Total Spend" sub-label
- Match card style: `bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-6`
- Add it to `App.jsx` in the `overview` view, below the BillingChart/AnomalyFeed row, full width (`col-span-3`)

### 8. Loading skeleton for AnomalyFeed — `AnomalyFeed.jsx`
- Add an `isLoading` prop to `AnomalyFeed`
- Create an internal `SkeletonCard` sub-component: same outer shape as an alert card, but with `animate-pulse` grey placeholder bars instead of real content (one wide bar for title, one narrow for badge, two medium bars for body text)
- In `App.jsx`, initialise a `isLoadingAlerts` state as `true`, set it to `false` after a 1500ms `setTimeout` in a `useEffect`. Pass it to `AnomalyFeed` as `isLoading`. While loading, render 3 `SkeletonCard`s.

### 9. Dark / light mode toggle — `Sidebar.jsx` + `index.css`
- In the Sidebar footer, add a small icon button (`Sun` / `Moon` from lucide) to the right of the user badge
- Clicking it toggles a `dark` class on `document.documentElement` and saves the preference to `localStorage`
- On mount, read `localStorage` preference (or fall back to `window.matchMedia('(prefers-color-scheme: dark)')`)
- In `index.css`, add a `.light` body variant: `background: #f8fafc`, `color: #0f172a`, and override `body::before` to use a light gradient. Use `html.dark` selector to keep the existing dark styles scoped.
- In every component, add light-mode alternatives for the main backgrounds using Tailwind's `dark:` prefix — e.g. replace `bg-slate-950` with `bg-slate-50 dark:bg-slate-950`, `bg-slate-900/50` with `bg-white/80 dark:bg-slate-900/50`, `text-slate-100` with `text-slate-900 dark:text-slate-100`, etc.

---

## Constraints

- Do NOT install any new npm packages. Use only what is already in `package.json`.
- Do NOT change the visual design of anything not explicitly mentioned above.
- Do NOT convert to TypeScript.
- Preserve the `animate-pulse-dot` animation from `index.css`.
- All new components follow the same file structure pattern (default export, named file in `src/components/`).
- After all changes, the app must have zero console errors and all four sidebar tabs must render distinct content.
