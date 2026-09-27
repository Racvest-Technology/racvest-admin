<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Racvest Admin — AI Agent Guide & Engineering Standards

Welcome to the **Racvest Admin** codebase. This file establishes mandatory rules, architecture conventions, and workflows for all autonomous AI agents and pair-programming assistants contributing to this repository.

---

## 1. Project Context & Domain

- **Product:** **Racvest Admin Portal**
- **Domain:** On-Demand Courier Logistics & Package Delivery Platform ("Uber for sending items")
- **Organization:** Racvest Technology
- **Core Operations:** Real-time dispatch oversight, courier onboarding & KYC verification, dynamic tariff & surge pricing configuration, proof-of-delivery (PoD) auditing, parcel dispute resolution, and rider/merchant financial settlement.

### Key Knowledge Assets
Always consult the companion documentation before making architectural or domain changes:
- [`PRD.md`](file:///Users/layefa/Projects/Racvest/admin/PRD.md): Product requirements, personas, order states, feature scopes, and operational KPIs.
- [`SYSTEM_DESIGN.md`](file:///Users/layefa/Projects/Racvest/admin/SYSTEM_DESIGN.md): System context, PostGIS data models, real-time telemetry streaming architecture, security threat models.
- [`ARCHITECTURE.md`](file:///Users/layefa/Projects/Racvest/admin/ARCHITECTURE.md): Folder layout, sequence diagrams, technology stack, and component hierarchies.

---

## 2. Technology Stack & Environment

- **Runtime & Framework:** Node.js (Active LTS), Next.js 16.3+ (App Router), React 19
- **Language:** TypeScript 5+ (Strict Mode enabled)
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`
- **Package Manager:** `pnpm` (version 10.x, specified in `package.json`). **Always use `pnpm`** (never `npm` or `yarn`).

### CLI Commands
```bash
# Start development server
pnpm dev

# Type check and build production bundle
pnpm build

# Run ESLint validation
pnpm lint
```

---

## 3. Mandatory Agent Rules & Principles

### Rule 1: Respect Next.js 16 & React 19 Conventions
- **Server Components by Default:** All files under `app/` are React Server Components (RSC) unless marked with `'use client'`.
- **Client Boundary Minimization:** Keep `'use client'` at the leaves of the component tree (e.g. map canvases, search inputs, modal triggers). Do not mark whole page routes as client components unless absolutely necessary.
- **Server Actions for Mutations:** Perform state updates, database writes, and admin overrides using Next.js Server Actions with Zod input validation and RBAC checks.
- **Consult `node_modules/next/dist/docs/`:** Next.js 16 contains breaking changes from older versions (e.g. async request APIs such as `cookies()`, `headers()`, `params`, and `searchParams`). Always verify current Next.js APIs.

### Rule 2: Strict Type Safety & Schemas
- No `any` or `unknown` casts without explicit narrowing.
- All domain entities (`Courier`, `Shipment`, `Waypoint`, `TariffRule`, `PayoutBatch`) must use types defined in `types/`.
- Validate all incoming user inputs and API responses with **Zod** schemas.

### Rule 3: Security & Privacy (PII Protection)
- **Zero PII Exposure:** Customer and recipient phone numbers and residential dropoff details are masked by default. Never log unmasked PII to the browser console, server terminal, or audit log payloads.
- **Granular RBAC:** Every administrative mutation (approving KYC, releasing payouts, modifying surge rates, reassigning drivers) must verify that the authenticated admin holds the corresponding permission.
- **No Client Secrets:** Never expose API keys or secrets in client bundles. Use server-only environment variables (`process.env.CORE_API_KEY`) and never prefix secrets with `NEXT_PUBLIC_`.

### Rule 4: Real-Time & Geolocation Best Practices
- **Map Component Loading:** Always dynamically import map libraries (Mapbox, Leaflet, Deck.gl) using `next/dynamic` with `{ ssr: false }`.
- **Performance:** When rendering vehicle telemetry or order streams, use viewport bounding-box subscriptions and linear coordinate interpolation (`lerp`) to prevent DOM thrashing and jitter.

### Rule 5: Styling & UI Aesthetics
- Use Tailwind CSS v4 semantic tokens and consistent typography.
- Support clean responsive layouts suitable for operations centers (wide-screen desktop displays and field tablets).
- Provide immediate visual feedback: loading skeletons for async boundaries (`loading.tsx`), optimistic UI updates for quick actions, and clear error states (`error.tsx`).

### Rule 6: Code Quality & Verification
- Prior to completing any user task:
  1. Verify the code compiles without TypeScript errors.
  2. Run `pnpm lint` to ensure ESLint rules pass cleanly.
  3. Ensure no regressions or unformatted diffs are introduced.
