import Link from "next/link";
import { getDepartmentSummaryFiltered } from "@/lib/queries/finance";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";
import { RefreshTableButton } from "@/components/RefreshTableButton";

export default async function DepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const rows = await getDepartmentSummaryFiltered(filters);
  const qs = new URLSearchParams(resolvedParams as Record<string, string>).toString();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Department Performance</h1>
          <p className="text-sm text-slate-500">
            {filters.dateFrom} to {filters.dateTo} · invoice grain, excludes void/cancelled. Adjust the filter bar
            above, then click Update Table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshTableButton />
          <a href={`/api/export/departments?${qs}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
        </div>
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
                    href={`/invoices?${new URLSearchParams({ ...(resolvedParams as Record<string, string>), department: r.department }).toString()}`}
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
            {rows.length === 0 && (
              <tr><td colSpan={13} className="px-3 py-6 text-center text-slate-400">No invoices found for these filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
