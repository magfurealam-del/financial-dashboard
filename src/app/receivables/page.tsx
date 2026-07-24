import Link from "next/link";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { getReceivablesSummary } from "@/lib/queries/finance";
import { formatBDT, formatDateBD, formatNumber, formatPercent } from "@/lib/format";
import { collectionRate } from "@/lib/metrics";
import { RefreshTableButton } from "@/components/RefreshTableButton";

export default async function ReceivablesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);
  const summary = await getReceivablesSummary(filters);
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  const aging90 = summary.buckets.find((bucket) => bucket.label.startsWith("90"));

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[.16em] text-indigo-600">Cash conversion</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Receivables</h1>
          <p className="text-sm text-slate-500">Validated, non-cancelled invoices from {filters.dateFrom} to {filters.dateTo}.</p>
        </div>
        <RefreshTableButton />
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Outstanding receivables" value={formatBDT(summary.totalOutstanding)} />
        <Metric label="Open invoices" value={formatNumber(summary.openInvoiceCount)} />
        <Metric label="Collection rate" value={formatPercent(collectionRate(summary.totalCollected, summary.totalNet))} />
        <Metric label="90+ day exposure" value={formatBDT(aging90?.amount ?? 0)} tone="warning" />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Receivables aging</h2>
          <p className="mt-1 text-xs text-slate-500">Age is measured from invoice date to the selected period end.</p>
          <div className="mt-4 space-y-3">
            {summary.buckets.map((bucket) => (
              <div key={bucket.label}>
                <div className="mb-1 flex justify-between text-sm"><span>{bucket.label}</span><span className="font-medium">{formatBDT(bucket.amount)}</span></div>
                <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${summary.totalOutstanding ? Math.min(100, bucket.amount / summary.totalOutstanding * 100) : 0}%` }} /></div>
                <div className="mt-1 text-xs text-slate-400">{formatNumber(bucket.invoices)} invoice{bucket.invoices === 1 ? "" : "s"}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-900">Largest outstanding invoices</h2><Link href={`/invoices?${qs}&paymentStatus=due`} className="text-xs font-medium text-indigo-600 hover:underline">View all</Link></div>
          <div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-xs uppercase text-slate-500"><tr><th className="pb-2">Invoice</th><th className="pb-2">Patient</th><th className="pb-2">Date</th><th className="pb-2 text-right">Balance</th></tr></thead><tbody>
            {summary.topInvoices.map((row: any) => <tr key={row.invoice_id} className="border-t border-slate-100"><td className="py-2"><Link href={`/invoices/${row.invoice_id}`} className="font-medium text-indigo-700 hover:underline">{row.invoice_no}</Link></td><td className="py-2">{row.patient_name ?? "Unresolved patient"}</td><td className="py-2 whitespace-nowrap">{formatDateBD(row.invoice_date)}</td><td className="py-2 text-right font-semibold">{formatBDT(row.outstanding_amount)}</td></tr>)}
            {summary.topInvoices.length === 0 && <tr><td colSpan={4} className="py-8 text-center text-slate-400">No outstanding invoices in this period.</td></tr>}
          </tbody></table></div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warning" }) {
  return <div className={`rounded-2xl border p-5 shadow-sm ${tone === "warning" ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"}`}><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div><div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div></div>;
}
