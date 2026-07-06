import { getDoctorShareSummary } from "@/lib/queries/finance";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";

export default async function DoctorsPage() {
  const rows = await getDoctorShareSummary();

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
}
