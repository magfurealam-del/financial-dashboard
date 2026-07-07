import { getDoctorShareSummary, getOtBreakdown } from "@/lib/queries/finance";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";

export default async function DoctorsPage() {
  const [rows, otRows] = await Promise.all([getDoctorShareSummary(), getOtBreakdown()]);

  const otByDoctor = otRows.reduce<Record<string, typeof otRows>>((acc, r: any) => {
    const key = r.doctor_name ?? "Unattributed";
    (acc[key] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold">Doctor Revenue Share</h1>
        <p className="text-sm text-slate-500">
          Doctor share is computed at line-item level from <code>doctor_share_pct</code> (populated from category and
          item-level share rules). There is no monthly-doctor-invoice table yet to validate/override these amounts or
          track paid-vs-payable status — see README for this schema gap.
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Doctor</th>
              <th className="px-3 py-2">Specialty</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-3 py-2 text-right">Gross Revenue</th>
              <th className="px-3 py-2 text-right">Net Revenue</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">Contribution After Share</th>
              <th className="px-3 py-2 text-right">CM%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.doctor_id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{r.doctor_name}</td>
                <td className="px-3 py-2">{r.doctor_specialty ?? "—"}</td>
                <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.gross_revenue_attributed)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue_attributed)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_amount)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.contribution_after_share)}</td>
                <td className="px-3 py-2 text-right">{formatPercent(r.contribution_margin_pct)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="px-3 py-6 text-center text-slate-400">No doctor-attributed invoices.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-700">OT/Surgery Revenue Breakdown</h2>
        <p className="mb-3 text-xs text-slate-500">
          OT Team Charge (including Daycare OT Bill, which is the same doctor fee for daycare cases) is 100% doctor
          share. Post-Operative Charge was confirmed to be a hospital-side charge, not doctor share, and is shown at
          0% here rather than being lumped into the doctor&apos;s payout.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">Doctor</th>
                <th className="px-3 py-2">OT Sub-type</th>
                <th className="px-3 py-2 text-right">Invoices</th>
                <th className="px-3 py-2 text-right">Line Items</th>
                <th className="px-3 py-2 text-right">Net Revenue</th>
                <th className="px-3 py-2 text-right">Doctor Share</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(otByDoctor).map(([doctorName, entries]) =>
                entries.map((r: any, idx: number) => (
                  <tr key={`${doctorName}-${r.ot_subcategory}`} className="border-t border-slate-100">
                    {idx === 0 && (
                      <td className="px-3 py-2 font-medium" rowSpan={entries.length}>{doctorName}</td>
                    )}
                    <td className="px-3 py-2">{r.ot_subcategory}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.line_item_count)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                  </tr>
                ))
              )}
              {otRows.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-6 text-center text-slate-400">No OT/Surgery revenue in this period.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
