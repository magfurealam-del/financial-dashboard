# Ekagra Health — Financial Dashboard

A finance/management dashboard for Ekagra Hospital / Ekagra Health, built on Next.js (App Router) +
TypeScript + Tailwind, reading live data from an existing Supabase Postgres database.

## Status: MVP

This is phase 1 of a phased build. Implemented so far:

- Executive Summary (KPI cards with period-over-period change, department revenue breakdown)
- Daily / Weekly / Monthly trend view with charts + toggle
- Invoice table (search, sort by date, pagination, CSV export) + invoice detail drill-down
  (line items, payments, discounts, doctor share, contribution margin)
- Department performance rollup
- Doctor revenue share rollup
- Patient revenue rollup (search, pagination)
- Data Quality / Reconciliation page (grouped exception list)
- Persistent top filter bar (date range, department, doctor, patient type, payment status) shared
  across all pages via URL query params
- Reusable Supabase query layer (`src/lib/queries/finance.ts`) and metric utilities
  (`src/lib/metrics.ts`), BDT + Asia/Dhaka formatting (`src/lib/format.ts`)

Not yet built (left for a follow-up iteration): campaign/marketing-source breakdowns, cashier/user
attribution, admission/ward/bed drill-downs, automated QA/validation script, materialized
summary tables for performance at scale.

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

- **Gross Revenue** = sum of line-item gross amounts, excluding void/cancelled invoices
- **Discount** = invoice-level + line-item-level discounts
- **Refund** = `invoices.total_refund`
- **Net Revenue** = Gross − Discounts − Refunds
- **Collected Revenue** = `invoices.total_collected`
- **Outstanding Revenue** = Net Revenue − Collected Revenue
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
5. **No branch/location, marketing source, or cashier/user field on `invoices`.** Marketing
   attribution exists in a separate CRM schema (`crm_billing_links`, `lead_attribution`,
   `marketing_campaign_map`) that isn't joined into the finance views yet — a follow-up could link
   `crm_billing_links.invoice_id` in to attribute revenue to marketing source.
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
