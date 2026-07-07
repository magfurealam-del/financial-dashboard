import { getMarketingSourceSummary } from "@/lib/queries/finance";
import { formatBDT, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

const METHOD_LABELS: Record<string, string> = {
  unattributed: "No CRM/lead record found",
  patient_lead_attribution: "Patient-level (most recent lead touch)",
  phone_e164_exact: "Direct match: phone number",
  hn_raw_match: "Direct match: hospital number (HN)",
  phone_e164_invoice_arbiter: "Direct match: phone + invoice arbitration",
};

export default async function MarketingPage() {
  const rows = await getMarketingSourceSummary();

  const bySource = rows.reduce<Record<string, typeof rows>>((acc, r: any) => {
    (acc[r.source_category] ??= []).push(r);
    return acc;
  }, {});

  const totalNet = rows.reduce((sum: number, r: any) => sum + Number(r.net_revenue || 0), 0);
  const attributedNet = rows
    .filter((r: any) => r.source_category !== "unattributed")
    .reduce((sum: number, r: any) => sum + Number(r.net_revenue || 0), 0);
  const attributedInvoices = rows
    .filter((r: any) => r.source_category !== "unattributed")
    .reduce((sum: number, r: any) => sum + Number(r.invoice_count || 0), 0);
  const totalInvoices = rows.reduce((sum: number, r: any) => sum + Number(r.invoice_count || 0), 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Revenue by Marketing Source</h1>
          <p className="text-sm text-slate-500">
            Attributed via <code>crm_billing_links</code> (direct invoice match) first, falling back to the
            patient&apos;s most recent lead-attribution record (<code>lead_attribution</code>) when no direct link
            exists. {formatNumber(attributedInvoices)} of {formatNumber(totalInvoices)} invoices (
            {totalInvoices ? Math.round((attributedInvoices / totalInvoices) * 100) : 0}%) are attributed today —
            the rest have no matching CRM/lead record for that patient.
          </p>
        </div>
        <a href="/api/export/marketing" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 whitespace-nowrap">Export CSV</a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase text-slate-500">Total Net Revenue</div>
          <div className="text-xl font-semibold">{formatBDT(totalNet)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase text-slate-500">Attributed Net Revenue</div>
          <div className="text-xl font-semibold">{formatBDT(attributedNet)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase text-slate-500">Attribution Coverage</div>
          <div className="text-xl font-semibold">{totalNet ? Math.round((attributedNet / totalNet) * 100) : 0}%</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Attribution Method</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-3 py-2 text-right">Patients</th>
              <th className="px-3 py-2 text-right">Gross</th>
              <th className="px-3 py-2 text-right">Net</th>
              <th className="px-3 py-2 text-right">Collected</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">Contribution</th>
              <th className="px-3 py-2 text-right">Avg Invoice</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bySource)
              .sort(([, a], [, b]) => {
                const sumA = a.reduce((s: number, r: any) => s + Number(r.net_revenue || 0), 0);
                const sumB = b.reduce((s: number, r: any) => s + Number(r.net_revenue || 0), 0);
                return sumB - sumA;
              })
              .map(([source, entries]) =>
                entries.map((r: any, idx: number) => (
                  <tr key={`${source}-${r.attribution_method}`} className={cn("border-t border-slate-100", source === "unattributed" && "bg-slate-50/50")}>
                    {idx === 0 && (
                      <td className="px-3 py-2 font-medium capitalize" rowSpan={entries.length}>
                        {source.replace(/_/g, " ")}
                      </td>
                    )}
                    <td className="px-3 py-2 text-slate-600">{METHOD_LABELS[r.attribution_method] ?? r.attribution_method}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.patient_count)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.gross_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.collected_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.avg_invoice_value)}</td>
                  </tr>
                ))
              )}
            {rows.length === 0 && (
              <tr><td colSpan={10} className="px-3 py-6 text-center text-slate-400">No marketing attribution data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
