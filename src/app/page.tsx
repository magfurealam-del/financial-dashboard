import { parseFiltersFromSearchParams, previousPeriod } from "@/lib/filters";
import { getExecutiveSummary, getExecutiveTrustSummary, getReceivablesSummary, getIpdOperationalSummary } from "@/lib/queries/finance";
import { KpiCard } from "@/components/KpiCard";
import { formatBDT, formatNumber, formatPercent } from "@/lib/format";
import { contributionMargin, contributionMarginPct, avgInvoiceValue, avgRevenuePerPatient, periodOverPeriodChange, collectionRate } from "@/lib/metrics";
import { RefreshTableButton } from "@/components/RefreshTableButton";

export default async function ExecutiveSummaryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const prev = previousPeriod(filters);

  const [current, previous, trust, receivables, ipd] = await Promise.all([
    getExecutiveSummary(filters),
    getExecutiveSummary({ ...filters, ...prev }),
    getExecutiveTrustSummary(filters),
    getReceivablesSummary(filters),
    getIpdOperationalSummary(),
  ]);

  const cm = contributionMargin(current.netRevenue, current.doctorShareTotal);
  const cmPct = contributionMarginPct(current.netRevenue, current.doctorShareTotal);
  const prevCm = contributionMargin(previous.netRevenue, previous.doctorShareTotal);

  const qs = new URLSearchParams(resolvedParams as Record<string, string>).toString();

  const departmentEntries = Object.entries(current.byDepartment).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[.16em] text-indigo-600">Leadership view</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Executive Summary</h1>
          <p className="text-sm text-slate-500">
            {filters.dateFrom} to {filters.dateTo} · figures in BDT · Asia/Dhaka. Adjust the filter bar above, then
            click Update Table.
          </p>
        </div>
        <RefreshTableButton />
      </div>

      <section className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-sm font-semibold text-slate-900">Data trust</h2><p className="text-xs text-slate-500">Validated invoice totals with explicit exceptions for the selected period.</p></div><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{trust.reviewCount === 0 ? "Validated" : "Needs review"}</span></div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5"><Trust label="Attribution coverage" value={formatPercent(trust.attributionCoverage)} /><Trust label="Invoices needing review" value={formatNumber(trust.reviewCount)} /><Trust label="Missing doctor" value={formatNumber(trust.missingDoctorCount)} /><Trust label="Reconciliation issues" value={formatNumber(trust.reconciliationIssues)} /><Trust label="Open IPD balance" value={formatNumber(ipd.openBalanceAdmissions.length)} /></div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-slate-900">What needs attention</h2><p className="mt-1 text-xs text-slate-500">Prioritized exceptions for executive follow-up.</p></div><a href={`/receivables?${qs}`} className="text-xs font-medium text-indigo-600 hover:underline">Open receivables</a></div><div className="mt-4 grid gap-3 md:grid-cols-4"><Attention label="IPD financial exposure" value={`${formatNumber(ipd.openBalanceAdmissions.length)} active balance patients`} href="/admissions" tone="warning" /><Attention label="Outstanding balances" value={formatBDT(receivables.totalOutstanding)} href={`/receivables?${qs}`} tone="warning" /><Attention label="Doctor attribution" value={`${formatNumber(trust.missingDoctorCount)} missing assignments`} href={`/doctors?${qs}`} tone="danger" /><Attention label="Data reconciliation" value={`${formatNumber(trust.reconciliationIssues)} unresolved issues`} href="/reconciliation" tone="danger" /></div></section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Net Revenue" value={formatBDT(current.netRevenue)} changePct={periodOverPeriodChange(current.netRevenue, previous.netRevenue)} href={`/invoices?${qs}`} />
        <KpiCard label="Collected Revenue" value={formatBDT(current.collectedRevenue)} changePct={periodOverPeriodChange(current.collectedRevenue, previous.collectedRevenue)} href={`/invoices?${qs}&paymentStatus=paid`} />
        <KpiCard label="Collection Rate" value={formatPercent(collectionRate(current.collectedRevenue, current.netRevenue))} href={`/receivables?${qs}`} />
        <KpiCard label="Outstanding Dues" value={formatBDT(current.outstandingRevenue)} changePct={periodOverPeriodChange(current.outstandingRevenue, previous.outstandingRevenue)} tone={current.outstandingRevenue > 0 ? "warning" : "default"} href={`/invoices?${qs}&paymentStatus=due`} />
        <KpiCard label="Contribution Margin" value={formatBDT(cm)} changePct={periodOverPeriodChange(cm, prevCm)} href={`/invoices?${qs}`} />
        <KpiCard label="Contribution Margin %" value={formatPercent(cmPct)} href={`/invoices?${qs}`} />
        <KpiCard label="Number of Invoices" value={formatNumber(current.invoiceCount)} href={`/invoices?${qs}`} />
        <KpiCard label="Number of Patients" value={formatNumber(current.patientCount)} href={`/patients?${qs}`} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-semibold text-slate-900">Financial drivers</h2><div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4"><Driver label="Gross revenue" value={formatBDT(current.grossRevenue)} /><Driver label="Doctor shares" value={formatBDT(current.doctorShareTotal)} /><Driver label="Discounts" value={formatBDT(current.discountTotal)} /><Driver label="Avg invoice" value={formatBDT(avgInvoiceValue(current.netRevenue, current.invoiceCount))} /></div></section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

function Trust({ label, value }: { label: string; value: string }) { return <div className="rounded-xl bg-white/80 p-3"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 font-semibold text-slate-900">{value}</div></div>; }
function Driver({ label, value }: { label: string; value: string }) { return <div><div className="text-xs text-slate-500">{label}</div><div className="mt-1 text-lg font-semibold text-slate-900">{value}</div></div>; }
function Attention({ label, value, href, tone }: { label: string; value: string; href: string; tone: "warning" | "danger" }) { return <a href={href} className={`rounded-xl border p-3 transition hover:-translate-y-0.5 ${tone === "danger" ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"}`}><div className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</div><div className="mt-2 text-sm font-semibold text-slate-950">{value}</div><div className="mt-2 text-xs text-indigo-700">Review →</div></a>; }
