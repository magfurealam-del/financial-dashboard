import { parseFiltersFromSearchParams, previousPeriod } from "@/lib/filters";
import { getExecutiveSummary } from "@/lib/queries/finance";
import { KpiCard } from "@/components/KpiCard";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";
import { contributionMargin, contributionMarginPct, avgInvoiceValue, avgRevenuePerPatient, periodOverPeriodChange } from "@/lib/metrics";
import { RefreshTableButton } from "@/components/RefreshTableButton";

export default async function ExecutiveSummaryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const prev = previousPeriod(filters);

  const [current, previous] = await Promise.all([
    getExecutiveSummary(filters),
    getExecutiveSummary({ ...filters, ...prev }),
  ]);

  const cm = contributionMargin(current.netRevenue, current.doctorShareTotal);
  const cmPct = contributionMarginPct(current.netRevenue, current.doctorShareTotal);
  const prevCm = contributionMargin(previous.netRevenue, previous.doctorShareTotal);

  const qs = new URLSearchParams(resolvedParams as Record<string, string>).toString();

  const departmentEntries = Object.entries(current.byDepartment).sort((a, b) => b[1] - a[1]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Executive Summary</h1>
          <p className="text-sm text-slate-500">
            {filters.dateFrom} to {filters.dateTo} · figures in BDT · Asia/Dhaka. Adjust the filter bar above, then
            click Update Table.
          </p>
        </div>
        <RefreshTableButton />
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <KpiCard label="Gross Revenue" value={formatBDT(current.grossRevenue)} changePct={periodOverPeriodChange(current.grossRevenue, previous.grossRevenue)} href={`/invoices?${qs}`} />
        <KpiCard label="Net Revenue" value={formatBDT(current.netRevenue)} changePct={periodOverPeriodChange(current.netRevenue, previous.netRevenue)} href={`/invoices?${qs}`} />
        <KpiCard label="Collected Revenue" value={formatBDT(current.collectedRevenue)} changePct={periodOverPeriodChange(current.collectedRevenue, previous.collectedRevenue)} href={`/invoices?${qs}&paymentStatus=paid`} />
        <KpiCard label="Outstanding Dues" value={formatBDT(current.outstandingRevenue)} changePct={periodOverPeriodChange(current.outstandingRevenue, previous.outstandingRevenue)} tone={current.outstandingRevenue > 0 ? "warning" : "default"} href={`/invoices?${qs}&paymentStatus=due`} />
        <KpiCard label="Discounts" value={formatBDT(current.discountTotal)} changePct={periodOverPeriodChange(current.discountTotal, previous.discountTotal)} href={`/invoices?${qs}`} />
        <KpiCard label="Refunds / Adjustments" value={formatBDT(current.refundTotal)} changePct={periodOverPeriodChange(current.refundTotal, previous.refundTotal)} href={`/invoices?${qs}&paymentStatus=refunded`} />
        <KpiCard label="Doctor Shares Payable" value={formatBDT(current.doctorShareTotal)} changePct={periodOverPeriodChange(current.doctorShareTotal, previous.doctorShareTotal)} href={`/doctors?${qs}`} />
        <KpiCard label="Contribution Margin" value={formatBDT(cm)} changePct={periodOverPeriodChange(cm, prevCm)} href={`/invoices?${qs}`} />
        <KpiCard label="Contribution Margin %" value={formatPercent(cmPct)} href={`/invoices?${qs}`} />
        <KpiCard label="Number of Invoices" value={formatNumber(current.invoiceCount)} href={`/invoices?${qs}`} />
        <KpiCard label="Number of Patients" value={formatNumber(current.patientCount)} href={`/patients?${qs}`} />
        <KpiCard label="Avg Revenue / Invoice" value={formatBDT(avgInvoiceValue(current.netRevenue, current.invoiceCount))} href={`/invoices?${qs}`} />
        <KpiCard label="Avg Revenue / Patient" value={formatBDT(avgRevenuePerPatient(current.netRevenue, current.patientCount))} href={`/patients?${qs}`} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Revenue by Department</h2>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2 text-right">Net Revenue</th>
                <th className="px-4 py-2 text-right">Share of Total</th>
              </tr>
            </thead>
            <tbody>
              {departmentEntries.map(([dept, amount]) => {
                const deptParams = new URLSearchParams(resolvedParams as Record<string, string>);
                deptParams.set("department", dept);
                return (
                <tr key={dept} className="border-t border-slate-100">
                  <td className="px-4 py-2">
                    <a className="hover:underline" href={`/invoices?${deptParams.toString()}`}>{dept}</a>
                  </td>
                  <td className="px-4 py-2 text-right">{formatBDT(amount)}</td>
                  <td className="px-4 py-2 text-right">{formatPercent(current.netRevenue ? (amount / current.netRevenue) * 100 : null)}</td>
                </tr>
                );
              })}
              {departmentEntries.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-400">No invoices in this period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
