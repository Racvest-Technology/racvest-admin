# System Design Document (SDD)
## Racvest Admin Portal — On-Demand Courier Logistics Platform

**System:** Racvest Admin Application  
**Version:** 1.0.0  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4  
**Architect:** Racvest Technology Engineering  

---

## 1. Frontend Application Architecture (Next.js 16 & React 19)

### 1.1 Rendering Strategy & Data Hydration
The application utilizes Next.js 16 App Router principles:
- **Server Components (RSC):** Default for static shells, metadata generation, authentication checks, initial table data hydration, and SEO/layout assembly.
- **Client Components (`'use client'`):** Reserved strictly for interactive UI boundaries:
  - Real-time map rendering (Mapbox GL JS / deck.gl).
  - High-frequency live filtering and search bars.
  - Interactive forms (Courier KYC review, Tariff slider configuration).
  - Real-time notification banners and WebSocket hooks.
  - Interactive data tables (TanStack Table) and dynamic charts (Recharts).
- **Server Actions & Zod:** Used for state-mutating actions (e.g., reassigning courier, issuing refund, approving KYC) with built-in CSRF prevention, strict Zod schema validation, and automatic cache revalidation (`revalidatePath`).
- **URL Query State (Nuqs):** Type-safe URL search params adapter syncing table pagination, active tab, date ranges (`7d`, `30d`), and filters (`status`, `packageType`, `location`).

### 1.2 Module & Component Layering

```mermaid
graph TD
    subgraph Presentation Layer
        Layouts[Root & Dashboard Layouts]
        Pages[App Router Page Modules]
        Features[Bulletproof Feature Modules: features/dashboard, features/dispatch]
        ShadcnUI[shadcn/ui Primitives: Buttons, Dialogs, Badges, Tabs]
        Charts[Recharts Visualizations: Revenue, Delivery, Growth, Donut]
        DataGrid[TanStack Table: Live Deliveries Grid]
    end

    subgraph State & Integration Layer
        ZustandStore[Client Stores: stores/ui-store.ts]
        NuqsAdapter[Nuqs: URL Search Params State]
        ZodValidator[Zod Schemas: Payload & Form Validation]
        TanStackQuery[Data Fetching & Server Cache: SWR/React Query]
        WSHook[useTelemetryStream & useSOSListener Hooks]
        ServerActions[Next.js Server Actions & API Handlers]
    end

    subgraph Data & Network Layer
        CoreClient[Typed Core REST Client with Axios/Fetch]
        TelemetrySocket[WebSocket Connection Manager]
    end

    Pages --> Layouts
    Pages --> Features
    Features --> ShadcnUI
    Features --> Charts
    Features --> DataGrid
    DataGrid --> NuqsAdapter
    Features --> ZustandStore
    Features --> TanStackQuery
    Features --> WSHook
    Features --> ZodValidator
    WSHook --> TelemetrySocket
    TanStackQuery --> ServerActions
    ServerActions --> CoreClient
```

---

## 2. Security Architecture & Threat Modeling

Given the sensitivity of logistics data (customer home addresses, high-value cargo declarations, courier payouts), the Admin Portal adheres to defense-in-depth principles.

### 2.1 Authentication & Session Management
1. **Multi-Factor Authentication (MFA):** Mandatory TOTP (RFC 6238) for all administrative logins.
2. **Session Cookies:**
   - `HttpOnly`, `Secure`, `SameSite=Strict` cookie containing signed, short-lived session token (15-minute expiration).
   - Sliding session renewal with rolling refresh tokens stored in Redis with revocation capability.
3. **Role-Based Access Control (RBAC):**
   - Enforced at both Next.js edge middleware level and Server Action invocation level.

| Capability / Resource | Super Admin | Dispatcher | Fleet Mgr | Support | Finance | Safety |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Live Dispatch & Reassignment** | Full | Full | Read-Only | Read-Only | None | Read-Only |
| **Courier KYC Approval / Ban** | Full | None | Full | None | None | Full |
| **Tariff & Surge Pricing Config** | Full | Read-Only | None | None | None | None |
| **Issue Payouts & Adjustments** | Full | None | None | None | Full | None |
| **Unmask PII (Phone/Full Address)** | Full | Partial | Partial | Masked | None | Full |
| **View Audit Logs** | Full | None | None | None | Read-Only | Full |

### 2.2 PII Protection & Data Minimization
- Customer and recipient phone numbers are masked by default (`+1 (555) ***-8921`).
- Dispatchers and support agents click "Request Unmasking" which triggers a logged security audit event and provides temporary (3-minute) visibility for active delivery troubleshooting only.
- Strict Content Security Policy (CSP) blocking unauthorized script injection and frame embedding (`frame-ancestors 'none'`).

---

## 3. Performance, Scalability & Resilience

### 3.1 Bundle & Asset Optimization
- Map engine code (Mapbox/Leaflet) is dynamically imported (`next/dynamic` with `ssr: false`) to avoid server-side bundling overhead and reduce initial page JavaScript payloads.
- Font optimization using `next/font` for Sora (primary) and Plus Jakarta Sans (secondary).
- Real-time table virtualization (TanStack Table + Virtual) to render lists of 10,000+ orders without DOM thrashing.

### 3.2 Fault Tolerance & Circuit Breaking
- In the event of backend telemetry degradation, the frontend automatically switches from high-frequency WebSockets to delta-polling with progressive throttling.
- Network offline indicator alerts operators if their connection to the dispatch grid drops, queuing pending actions locally with confirmation prior to re-execution.
