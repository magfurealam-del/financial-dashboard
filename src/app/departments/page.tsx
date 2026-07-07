import Link from "next/link";
import { getDepartmentSummary } from "@/lib/queries/finance";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";
import { todayBD } from "@/lib/format";

// This page shows all-time totals, so drill-down links use a wide date range
// rather than whatever the shared filter bar currently has selected.
const ALL_TIME_FROM = "2000-01-01";

export default async function DepartmentsPage() {
  const rows = await getDepartmentSummary();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Department Performance</h1>
          <p className="text-sm text-slate-500">All-time totals per department (invoice grain, excludes void/cancelled).</p>
        </div>
        <a href="/api/export/departments" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-3 py-2 text-right">Patients</th>
              <th className="px-3 py-2 text-right">Gross</th>
              <th className="px-3 py-2 text-right">Net</th>
              <th className="px-3 py-2 text-right">Collected</th>
              <th className="px-3 py-2 text-right">Discounts</th>
              <th className="px-3 py-2 text-right">Refunds</th>
              <th className="px-3 py-2 text-right">Outstanding</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">Contribution</th>
              <th className="px-3 py-2 text-right">CM%</th>
              <th className="px-3 py-2 text-right">Avg Invoice</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.department} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 font-medium">
                  <Link
                    href={`/invoices?from=${ALL_TIME_FROM}&to=${todayBD()}&department=${encodeURIComponent(r.department)}`}
                    className="text-blue-700 hover:underline"
                  >
                    {r.department}
                  </Link>
                </td>
                <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                <td className="px-3 py-2 text-right">{formatNumber(r.patient_count)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.gross_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.collected_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.discount_total)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.refund_total)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.outstanding_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                <td className="px-3 py-2 text-right">{formatPercent(r.contribution_margin_pct)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.avg_invoice_value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
