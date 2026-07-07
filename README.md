# Ekagra Health — Financial Dashboard

A finance/management dashboard for Ekagra Hospital / Ekagra Health, built on Next.js (App Router) +
TypeScript + Tailwind, reading live data from an existing Supabase Postgres database.

## Status: Phase 2 complete

Phase 1 (MVP) + phase 2 (drill-downs, validation, marketing attribution, admissions) are both done.
Implemented so far:

- Executive Summary (every KPI card clickable through to filtered invoices, period-over-period
  change, department revenue breakdown)
- Daily / Weekly / Monthly trend view with charts + toggle; every period row drills into its exact
  date range
- Invoice table (search, sort by date, pagination, CSV export) + invoice detail drill-down
  (line items, payments, discounts, doctor share, contribution margin, admission/ward/bed/LOS when
  applicable)
- Department performance rollup — filter-bar-aware with an explicit **Update Table** button (CSV
  export, drill-down to filtered invoices). Includes a **Diagnostics** row (PATHOLOGY + ADVANCED
  DIAGNOSTICS categories) carved out of whichever department the invoice was billed under (OPD/IPD/
  etc), using exact per-line-item net/gross/discount/doctor-share splits — the department list still
  sums to exactly total net revenue (verified via `/validation`). Same carve-out applied to the
  Executive Summary's department breakdown. Note: this means `Lab/Pathology` (the raw
  `invoices.department` value) now shows only its small residual after pathology line items move to
  Diagnostics — expected, not a bug.
- Doctor revenue share rollup + OT/Surgery sub-category breakdown (CSV export, drill-down)
- Patient revenue rollup (search, pagination, CSV export, drill-down to that patient's invoices)
- Admissions page: ward/bed/length-of-stay for IPD, filterable IPD/Daycare/All (CSV export). Top
  panel shows live IPD census (total + by ward category: Female/Male/Single Cabin/Shared Cabin/VIP),
  a dynamic per-doctor current-patient count (only doctors with patients currently admitted), and a
  daily/monthly occupancy trend chart (`vw_finance_ipd_current_status`, `vw_finance_ipd_daily_census`)
- Revenue by Marketing Source (CSV export): CRM/lead attribution joined in, with coverage %
- Data Validation / QA page: 9 automated invariant checks against live data (CSV export)
- Data Quality / Reconciliation page (grouped exception list, CSV export)
- Persistent top filter bar (date range, department, doctor, patient type, payment status) shared
  across all pages via URL query params
- Reusable Supabase query layer (`src/lib/queries/finance.ts`) and metric utilities
  (`src/lib/metrics.ts`), BDT + Asia/Dhaka formatting (`src/lib/format.ts`)
- `refresh_finance_derived_data()` Postgres function (doctor-share resolution, category mapping,
  invoice-doctor backfill) runs **automatically** via database triggers on `invoices`/
  `invoice_line_items` inserts — self-healing as new invoices land, regardless of which external
  tool performs the import (verified: no code access to that external OCR/Pabbly pipeline was
  available or needed).

Not yet built (left for a follow-up iteration): cashier/user attribution (no such field exists on
`invoices` yet), branch/location reporting (single-location hospital today), materialized summary
tables for performance at scale (not needed yet at ~900 invoices).

## Setup

```bash
npm install
cp .env.local.example .env.local   # then fill in the two keys below
npm run dev
```

### Environment variables (`.env.local`, never committed)

| Variable | Where to find it | Exposed to browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings → API → Project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings → API → anon/publishable key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings → API → service_role key | **No — server only** |

The finance tables/views have row-level security that only grants `SELECT` to the `authenticated`
role (see [Security note](#security-note) below). Because this is an internal staff dashboard with
no separate patient-facing auth flow yet, all data reads happen in Server Components / Route
Handlers using the `service_role` key (`src/lib/supabase/server.ts`). **Never** import that file
from a `"use client"` component, and never prefix the service role key with `NEXT_PUBLIC_`.

### Security note

The `service_role` key bypasses Row Level Security entirely. It is only ever used server-side. If
this dashboard is later opened up to more than a small trusted internal team, replace the
service-role reads with a proper Supabase Auth session + RLS policies scoped to a `staff`/`finance`
role, rather than continuing to rely on the service role key.

Separately, during setup we discovered `service_role` was missing base table `GRANT SELECT`
privileges project-wide (RLS bypass alone wasn't enough because the underlying grants had been
revoked). We applied a non-destructive, additive migration
(`grant_service_role_select_finance_tables`) that grants `SELECT` on all `public` schema tables to
`service_role`, plus a default privilege so future tables inherit it. This did not change any
`authenticated`/`anon` policies.

## Data model this dashboard relies on

Existing tables (already in Supabase, not created by this project):

- `invoices`, `invoice_line_items`, `invoice_payments`, `invoice_discounts`
- `patients`, `doctors`, `admissions`
- `service_categories`, `service_items`
- `doctor_revenue_share_rules` (category-level %), `doctor_item_share_rules` (item-level %)

Doctor share is **not** computed client-side from the rule tables — it's pre-resolved onto
`invoice_line_items.doctor_share_pct` (and `is_revenue_share_eligible`) by an existing upstream
process, and `invoice_line_items.cogs_total` already carries direct/variable cost when known. The
SQL views below simply aggregate those pre-resolved fields.

### Views created by this project (non-destructive, `CREATE OR REPLACE VIEW`)

Applied via Supabase migration `create_finance_dashboard_views`:

- `vw_finance_line_item_summary` — line-item grain with doctor share amount and contribution margin
- `vw_finance_invoice_summary` — invoice grain with patient/doctor attribution, doctor share,
  contribution margin (both plain and adjusted-for-direct-cost)
- `vw_finance_daily_summary`, `vw_finance_weekly_summary`, `vw_finance_monthly_summary`
- `vw_finance_department_summary`
- `vw_finance_doctor_share_summary`
- `vw_finance_patient_summary`
- `vw_finance_reconciliation_issues`

All views exclude invoices with `invoice_status in ('void','cancelled')` (today all 859 invoices
have `invoice_status = 'final'`, so this is a defensive filter for future data).

## Metric definitions (single source of truth)

Implemented in `src/lib/metrics.ts` and the SQL views above — do not recompute these differently
elsewhere in the codebase.

- **Gross Revenue** = `invoices.total_bill` (item subtotal + service charge + VAT + urgent fee),
  excluding void/cancelled invoices. (Corrected 2026-07-07 — previously used `item_total` alone,
  which understated Gross whenever a service charge/VAT/urgent fee applied, breaking the
  Gross − Discount − Refund = Net identity for ~22 invoices.)
- **Discount** = invoice-level + line-item-level discounts
- **Refund** = `invoices.total_refund`
- **Net Revenue** = `invoices.net_bill` (billed amount post-discount). Refunds are **not** further
  subtracted here — see the note below on why.
- **Collected Revenue** = `invoices.total_collected − invoices.total_refund` (net cash actually
  retained). (Corrected 2026-07-07 — previously used raw `total_collected`, which overstated
  collected revenue by the refunded amount on refunded invoices.)
- **Outstanding Revenue** = `invoices.total_due` (already correctly clamped at 0 and nets refunds
  against collections at the source — do not recompute as `Net − Collected` without the clamp, since
  overpayments/advance deposits can make that go negative).

  **Why refunds reduce Collected Revenue, not Net Revenue:** the data shows `net_bill` is always
  `total_bill − discount_total`, and the pre-existing `total_due` field is always
  `net_bill − (total_collected − total_refund)`. That means a refund is modeled as a **collections-side
  event** (money paid back after being collected), not a retroactive reduction to what was billed.
  Net Revenue represents what was invoiced; Collected Revenue represents what was actually kept.
- **Doctor Share** = Σ `line.net_amount × line.doctor_share_pct / 100` for revenue-share-eligible lines
- **Contribution Margin** = Net Revenue − Doctor Share
- **Contribution Margin %** = Contribution Margin ÷ Net Revenue
- **Adjusted Contribution Margin** = Net Revenue − Doctor Share − Direct Variable Cost
  (`cogs_total`, where tracked)
- **Collection Rate** = Collected Revenue ÷ Net Revenue
- **Discount Rate** = Discount ÷ Gross Revenue
- **Refund Rate** = Refund ÷ Gross Revenue
- **Avg Invoice Value** = Net Revenue ÷ Invoice Count
- **Avg Revenue / Patient** = Net Revenue ÷ Unique Patient Count

All dates are treated as **invoice date** (`invoices.invoice_date`) in **Asia/Dhaka**, and all
currency is formatted as **BDT**. Default view is current month-to-date.

## Data validation (`/validation`)

An automated QA page backed by `vw_finance_validation_checks`, checking the invariants above hold
against live data: invoice-total-matches-line-items, monthly/department rollup consistency,
contribution margin formula correctness, void-invoice exclusion, and outstanding = net − collected
(clamped). Re-run any time by re-querying the view — safe, read-only. As of 2026-07-07: 7 passing,
2 warning (see below), 1 not-applicable (doctor-share-vs-monthly-invoice, schema gap #1).

Two **warning**-level findings are flagged for finance review rather than auto-corrected, since
guessing wrong here would corrupt otherwise-correct figures:
- **27 invoices have a recorded discount that was not actually reflected in `net_bill`** (net_bill
  equals the pre-discount total). Could be a parsing gap, or the discount was quoted but not applied
  — needs a source-document check before deciding whether to correct `net_bill` or `discount_total`.
- **The monthly rollup excludes ~75k BDT** from invoices with a null `invoice_date` (see below).

## Known schema gaps / assumptions (please validate with the finance team)

1. **No monthly doctor invoice / payment table.** The spec calls for validating calculated doctor
   share against a monthly doctor invoice record and flagging mismatches. That table doesn't exist
   yet in Supabase — the Doctor Revenue Share page currently shows only the *calculated* amount,
   with no paid/payable/mismatch status. Needs a new table (e.g. `doctor_monthly_payouts`) before
   that feature can be built.
2. **No standalone refunds table.** Refunds are captured only as `invoices.total_refund` /
   `admissions.total_refund` aggregate fields — there's no per-refund reason, approver, or date.
   `invoice_discounts` does have per-row detail (reason via `raw_discount_text`, `approved_by`) but
   refunds don't have an equivalent.
3. **Reconciliation issues: 1,180 found originally, 43 remain** (see `/reconciliation`) after fixing
   doctor-share resolution (817 line items), invoice-doctor attribution (55 invoices), and line-item
   category mapping (all 265 line items). Category mapping included adding a new **ADVANCED
   DIAGNOSTICS** category (`service_categories.id = 24`) for TM Flow, Neurotouch, Mimosa,
   Moleculight, Wound Screening Package, Fibroscan, and all Duplex Study variants — these were
   previously either uncategorized or inconsistently split across `PATHOLOGY`/`OPD SERVICES`
   depending on the invoice. The remaining 43 (invoice missing patient, negative revenue lines,
   paid-exceeds-invoice, duplicate patient phone) are unrelated data-quality items, still open.
4. **No payment method breakdown** beyond `invoice_payments.pay_mode`/`pay_type`, which are free
   text (not yet normalized against a lookup table).
5b. **Admission/ward/bed/length-of-stay drill-down is now built** (see `/admissions`, backed by
   `vw_finance_admission_summary`), linked from IPD invoice detail pages too. Note: `admission_type`
   is `'Daycare'` for all non-inpatient case types (OPD/Consultancy/Pharmacy/Therapy/Lab) — only 30 of
   757 admissions are true `'IPD'` inpatient stays with real ward/bed/LOS data; the rest have no ward
   assigned (shows as "OPD"/"Pharmacy" as a case-type label, not a physical ward).
5. **No branch/location or cashier/user field on `invoices`.** Marketing source attribution *is now*
   joined in (see `/marketing`, backed by `vw_finance_invoice_marketing` /
   `vw_finance_marketing_source_summary`): direct `crm_billing_links.invoice_id` match first, falling
   back to the patient's most recent `lead_attribution` record when no direct link exists. Only
   **24% of net revenue** is attributed today — the CRM/lead pipeline simply hasn't matched most
   patients yet (666 of 915 invoices have no CRM/lead record at all for that patient). This is a
   coverage gap in the upstream CRM matching process, not something the dashboard can improve
   further without better source data.
6. **~75k BDT of net revenue sits on invoices with a null `invoice_date`**, and this is intentional
   for 18 of them (an explicit CFO data rule: historical carryover collections with no true service
   date — see `is_date_unknown_carryover` flag on `vw_finance_invoice_summary`, shown as a badge on
   the invoice list/detail pages rather than fabricated). These are excluded from the daily/weekly/
   monthly trend views but included in aggregate KPI totals when no date filter narrows them out.
7. All 859 invoices currently have `invoice_status = 'final'` — no void/cancelled invoices exist
   yet to verify the exclusion logic against real data.
8. **Doctor revenue share required several corrections beyond the raw rule tables** — line items
   weren't linked to `service_item_id`, 47 invoices had no `doctor_id` despite having
   `consultant_name_raw`, and the OT/Surgery category rule (100%) was being applied uniformly to
   sub-charges that are actually hospital-side (`Post-Operative Charge` / `Post-Operative Charge Per
   Hour` — confirmed with finance, now 0%) versus doctor-side (`OT Team Charge`, `Daycare OT Bill` —
   confirmed 100%). See `vw_finance_ot_breakdown` for the sub-category split.

## Tech stack

- Next.js 16 (App Router, Server Components, Turbopack)
- TypeScript, Tailwind CSS
- `@supabase/supabase-js` for data access
- Recharts for trend charts
- No client-side state library — filters live in the URL query string so every page/chart/table is
  filter-aware and links are shareable

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the three environment variables above in Vercel Project Settings → Environment Variables
   (mark `SUPABASE_SERVICE_ROLE_KEY` as a **sensitive/server-only** variable — do not expose it to
   the client bundle).
4. Deploy. `npm run build` has been verified to succeed locally.
