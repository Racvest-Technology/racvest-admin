# System Design Document (SDD)
## Racvest Admin Portal — On-Demand Courier Logistics Platform

**System:** Racvest Admin Application  
**Version:** 1.0.0  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4  
**Architect:** Racvest Technology Engineering  

---

## 1. System Overview & Context

The **Racvest Admin Portal** is the operational back-office web application for Racvest’s on-demand parcel and courier dispatch system. It provides high-concurrency real-time location tracking, fleet management, tariff calculation engines, parcel audit tools, and payment settlement workflows.

### 1.1 Context Diagram (C4 Level 1)

```mermaid
C4Context
    title System Context for Racvest Admin Portal

    Person(admin, "Admin / Dispatcher / Operator", "Monitors orders, verifies couriers, overrides dispatch, audits finance")
    System(admin_portal, "Racvest Admin Portal", "Next.js 16 App Router SPA/SSR interface for ops control")
    System(core_api, "Racvest Core Logistics API", "Manages order lifecycles, matching algorithms, user accounts")
    System(realtime_gateway, "Real-Time Telemetry Gateway", "WebSocket/SSE service delivering courier GPS pings & order events")
    System(geo_engine, "Routing & Geocoding Engine", "Calculates ETAs, shortest paths, polyline rendering, geofences")
    System_Ext(payments, "Payment & Payout Gateways", "Stripe, Paystack, Flutterwave, Banking APIs")
    System_Ext(storage, "Cloud Object Storage", "AWS S3 / Cloudflare R2 for KYC documents & PoD images")

    Rel(admin, admin_portal, "Interacts via HTTPS", "Next.js UI")
    Rel(admin_portal, core_api, "REST / GraphQL / Server Actions", "JSON / HTTPS")
    Rel(admin_portal, realtime_gateway, "Live Telemetry Feed", "WSS / SSE")
    Rel(admin_portal, geo_engine, "Map tiles, routing, geofence polygons", "HTTPS")
    Rel(core_api, payments, "Disburses courier payouts & processes refunds", "HTTPS")
    Rel(core_api, storage, "Stores PoD photos, signatures, KYC documents", "S3 API")
```

---

## 2. Core Entities & Data Architecture

The Admin Portal interacts with the core relational database (PostgreSQL with PostGIS extension for spatial queries).

### 2.1 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    ADMIN_USER ||--o{ AUDIT_LOG : generates
    ADMIN_USER }|--|| ROLE : assigned
    COURIER ||--|| VEHICLE : operates
    COURIER ||--o{ COURIER_DOCUMENT : provides
    COURIER ||--o{ SHIPMENT : delivers
    COURIER ||--o{ PAYOUT_TRANSACTION : receives
    COURIER ||--o{ SOS_INCIDENT : triggers
    CUSTOMER ||--o{ SHIPMENT : requests
    CUSTOMER ||--o{ SOS_INCIDENT : reports
    SHIPMENT ||--|| PROOF_OF_DELIVERY : verified_by
    SHIPMENT ||--o{ WAYPOINT : contains
    SHIPMENT ||--o{ DISPUTE_CLAIM : subject_to
    TARIFF_ZONE ||--o{ TARIFF_RULE : defines

    ADMIN_USER {
        uuid id PK
        string email UK
        string full_name
        uuid role_id FK
        boolean mfa_enabled
        timestamp last_login_at
        string status
    }

    COURIER {
        uuid id PK
        string phone UK
        string full_name
        string avatar_url
        string kyc_status
        string live_status
        float rating_score
        decimal wallet_balance
        geometry current_location
        timestamp last_ping_at
    }

    VEHICLE {
        uuid id PK
        uuid courier_id FK
        string vehicle_type
        string license_plate UK
        string make_model
        int max_weight_capacity_kg
        float max_volume_capacity_cbm
    }

    SHIPMENT {
        uuid id PK
        string tracking_number UK "Format: RCV-XXXXX"
        uuid sender_id FK
        uuid courier_id FK
        string package_type "Clothing, Furniture, Sports, Beauty, Books, Groceries"
        string status "Delivered, In transit, Pending, Picked Up, Cancelled"
        decimal declared_value
        decimal base_fare
        decimal surge_multiplier
        decimal total_price
        string payment_status
        timestamp created_at
        timestamp delivered_at
    }

    SOS_INCIDENT {
        uuid id PK
        uuid shipment_id FK
        uuid triggered_by_user_id FK
        string user_type "COURIER or CUSTOMER"
        geometry panic_location
        string incident_status "ACTIVE, DISPATCHED, RESOLVED, FALSE_ALARM"
        timestamp triggered_at
        timestamp resolved_at
    }

    WAYPOINT {
        uuid id PK
        uuid shipment_id FK
        int stop_order
        string address_text
        geometry location
        string recipient_name
        string recipient_phone_masked
        string stop_type
        timestamp arrived_at
    }

    PROOF_OF_DELIVERY {
        uuid id PK
        uuid shipment_id FK
        string otp_code_hash
        boolean otp_verified
        string signature_url
        string photo_url
        geometry dropoff_location
        timestamp confirmed_at
    }

    TARIFF_RULE {
        uuid id PK
        string vehicle_type
        decimal base_fare
        decimal per_km_rate
        decimal per_minute_rate
        decimal surge_rate
        decimal minimum_charge
    }
```

---

## 3. Real-Time Telemetry & Live Map Streaming

One of the most intensive features of the Racvest Admin Portal is real-time tracking of hundreds to thousands of concurrent couriers, active shipments, and instant SOS alerts.

### 3.1 Real-Time Streaming Architecture

```mermaid
sequenceDiagram
    autonumber
    actor Dispatcher as Operations Dispatcher
    participant NextClient as Next.js Admin Client
    participant BFF as Next.js Route Handler / Proxy
    participant TelemetryWS as Telemetry Gateway (WebSockets)
    participant RedisPubSub as Redis Pub/Sub / GeoStream

    Dispatcher->>NextClient: Opens Live Dispatch Console
    NextClient->>BFF: Establish Authenticated Session (Cookie)
    BFF->>TelemetryWS: Exchange JWT for Ephemeral Channel Token
    NextClient->>TelemetryWS: Connect `wss://telemetry.racvest.internal/v1/live`
    TelemetryWS-->>NextClient: 101 Switching Protocols (Connection Established)
    NextClient->>TelemetryWS: Subscribe to Viewport Geobounds `[min_lat, min_lng, max_lat, max_lng]`
    
    loop Every 3-5 seconds
        RedisPubSub->>TelemetryWS: Broadcast rider coordinate batch
        TelemetryWS-->>NextClient: Push Batched Position Frame `{ courier_id, lat, lng, heading, speed, status }`
        NextClient->>NextClient: Canvas/WebGL Map Interpolation (Smooth Movement)
    end

    opt Emergency SOS Triggered
        RedisPubSub->>TelemetryWS: High-Priority Broadcast `EVENT_SOS_TRIGGERED`
        TelemetryWS-->>NextClient: Audio-Visual SOS Alert Banner `{ incident_id, shipment_id, lat, lng }`
    end
```

### 3.2 GPS Drift Filtering & Coordinate Interpolation
- **Dead Reckoning & Slerp/Lerp:** To prevent jerky vehicle movements on the dispatcher's screen, the frontend map engine uses Linear Interpolation (`lerp`) across the last 2 timestamped coordinates, taking vehicle bearing into account.
- **Viewport Bounding Box Filtering:** Rather than subscribing to every driver nationwide, the client transmits its current map viewport coordinates (`bounds`). The gateway only streams events for drivers within or intersecting that spatial bounding box.
- **Heartbeat & Resilient Reconnection:** Exponential backoff with jitter (`1s`, `2s`, `4s`, up to `30s` max) if the WebSocket disconnects, seamlessly falling back to a 5-second polling route handler (`/api/dispatch/telemetry-snapshot`).

---

## 4. Frontend Application Architecture (Next.js 16 & React 19)

### 4.1 Rendering Strategy & Data Hydration
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

### 4.2 Module & Component Layering

```mermaid
graph TD
    subgraph Presentation Layer
        Layouts[Root & Dashboard Layouts]
        Pages[App Router Page Modules]
        Widgets[Domain Widgets: DispatchMap, TariffEditor, KYCReviewer]
        ShadcnUI[shadcn/ui Primitives: Buttons, Dialogs, Badges, Tabs]
        Charts[Recharts Visualizations: Revenue, Delivery, Growth, Donut]
        DataGrid[TanStack Table: Live Deliveries Grid]
    end

    subgraph State & Integration Layer
        ZustandStore[Client Stores: Viewport, SelectedShipment, Drawers]
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
    Pages --> Widgets
    Widgets --> ShadcnUI
    Widgets --> Charts
    Widgets --> DataGrid
    DataGrid --> NuqsAdapter
    Widgets --> ZustandStore
    Widgets --> TanStackQuery
    Widgets --> WSHook
    Widgets --> ZodValidator
    WSHook --> TelemetrySocket
    TanStackQuery --> ServerActions
    ServerActions --> CoreClient
```
    TanStackQuery --> ServerActions
    ServerActions --> CoreClient
```

---

## 5. Security Architecture & Threat Modeling

Given the sensitivity of logistics data (customer home addresses, high-value cargo declarations, courier payouts), the Admin Portal adheres to defense-in-depth principles.

### 5.1 Authentication & Session Management
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

### 5.2 PII Protection & Data Minimization
- Customer and recipient phone numbers are masked by default (`+1 (555) ***-8921`).
- Dispatchers and support agents click "Request Unmasking" which triggers a logged security audit event and provides temporary (3-minute) visibility for active delivery troubleshooting only.
- Strict Content Security Policy (CSP) blocking unauthorized script injection and frame embedding (`frame-ancestors 'none'`).

---

## 6. Performance, Scalability & Resilience

### 6.1 Bundle & Asset Optimization
- Map engine code (Mapbox/Leaflet) is dynamically imported (`next/dynamic` with `ssr: false`) to avoid server-side bundling overhead and reduce initial page JavaScript payloads.
- Font optimization using `next/font` for Geist and Inter.
- Real-time table virtualization (TanStack Table + Virtual) to render lists of 10,000+ orders without DOM thrashing.

### 6.2 Fault Tolerance & Circuit Breaking
- In the event of backend telemetry degradation, the frontend automatically switches from high-frequency WebSockets to delta-polling with progressive throttling.
- Network offline indicator alerts operators if their connection to the dispatch grid drops, queuing pending actions locally with confirmation prior to re-execution.
