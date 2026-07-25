import { getMarketingSourceSummaryFiltered, getFacebookAttributionAudit, getMarketingDepartmentSummary, getFacebookDepartmentSummary } from "@/lib/queries/finance";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { formatBDT, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import { RefreshTableButton } from "@/components/RefreshTableButton";

const METHOD_LABELS: Record<string, string> = {
  unattributed: "No validated CRM attribution",
  validated_invoice_crm_patient_attribution: "Validated invoice CRM + patient attribution",
  validated_patient_marketing_attribution: "Validated patient marketing attribution",
};

const METHOD_DESCRIPTIONS: Record<string, string> = {
  unattributed: "No approved or matched CRM reconciliation and no patient-level lead attribution was available.",
  validated_invoice_crm_patient_attribution:
    "The invoice is present in crm_invoice_reconciliation with a matched or approved status, and the patient's validated_source comes from patient_marketing_attribution.",
  validated_patient_marketing_attribution:
    "The patient's validated_source comes from patient_marketing_attribution; no matched invoice reconciliation row was required for this patient-level rollup.",
};

export default async function MarketingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const [rows, facebookAudit, departmentRows, facebookDepartmentRows] = await Promise.all([getMarketingSourceSummaryFiltered(filters), getFacebookAttributionAudit(filters), getMarketingDepartmentSummary(filters), getFacebookDepartmentSummary(filters)]);
  const qs = new URLSearchParams(resolvedParams as Record<string, string>).toString();

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
            {filters.dateFrom} to {filters.dateTo} · Validated attribution uses <code>invoices</code> joined to{" "}
            <code>crm_invoice_reconciliation</code> and the canonical <code>patient_marketing_attribution</code>{" "}
            rollup. {formatNumber(attributedInvoices)} of{" "}
            {formatNumber(totalInvoices)} invoices (
            {totalInvoices ? Math.round((attributedInvoices / totalInvoices) * 100) : 0}%) are attributed in this
            period. Invoices marked <code>needs_review</code> are excluded. Adjust the filter bar above, then
            click Update Table.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshTableButton />
          <a href={`/api/export/marketing?${qs}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 whitespace-nowrap">Export CSV</a>
        </div>
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
              .flatMap(([source, entries]) => {
                const methodRows = entries.map((r: any, idx: number) => (
                  <tr key={`${source}-${r.attribution_method}`} className={cn("border-t border-slate-100 align-top", source === "unattributed" && "bg-slate-50/50")}>
                    {idx === 0 && (
                      <td className="px-3 py-2 font-medium capitalize" rowSpan={entries.length + (entries.length > 1 ? 1 : 0)}>
                        {source.replace(/_/g, " ")}
                      </td>
                    )}
                    <td className="px-3 py-2 text-slate-600">
                      <div>{METHOD_LABELS[r.attribution_method] ?? r.attribution_method}</div>
                      <div className="mt-0.5 text-xs font-normal text-slate-400">
                        {METHOD_DESCRIPTIONS[r.attribution_method] ?? "No description available."}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(r.patient_count)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.gross_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.collected_revenue)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(r.avg_invoice_value)}</td>
                  </tr>
                ));

                if (entries.length <= 1) return methodRows;

                const totalInvoiceCount = entries.reduce((s: number, r: any) => s + Number(r.invoice_count || 0), 0);
                // Method rows can share patients. Source totals use the union of
                // canonical patient IDs returned by the attribution query.
                const totalPatientCount = Number(entries[0]?.source_patient_count ?? entries.reduce((s: number, r: any) => s + Number(r.patient_count || 0), 0));
                const totalGross = entries.reduce((s: number, r: any) => s + Number(r.gross_revenue || 0), 0);
                const totalNetForSource = entries.reduce((s: number, r: any) => s + Number(r.net_revenue || 0), 0);
                const totalCollected = entries.reduce((s: number, r: any) => s + Number(r.collected_revenue || 0), 0);
                const totalDoctorShare = entries.reduce((s: number, r: any) => s + Number(r.doctor_share_total || 0), 0);
                const totalContribution = entries.reduce((s: number, r: any) => s + Number(r.contribution_margin || 0), 0);

                const totalRow = (
                  <tr key={`${source}-total`} className="border-t border-slate-200 bg-slate-50 font-semibold">
                    <td className="px-3 py-2 text-slate-700">Total ({source.replace(/_/g, " ")}, all methods)</td>
                    <td className="px-3 py-2 text-right">{formatNumber(totalInvoiceCount)}</td>
                    <td className="px-3 py-2 text-right">{formatNumber(totalPatientCount)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalGross)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalNetForSource)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalCollected)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalDoctorShare)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalContribution)}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(totalInvoiceCount ? totalNetForSource / totalInvoiceCount : null)}</td>
                  </tr>
                );

                return [...methodRows, totalRow];
              })}
            {rows.length === 0 && (
              <tr><td colSpan={10} className="px-3 py-6 text-center text-slate-400">No marketing attribution data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4"><h2 className="text-sm font-semibold text-slate-900">Revenue and attribution by department</h2><p className="mt-1 text-xs text-slate-500">Attributed revenue uses the canonical patient marketing source after CRM patient correction. Department totals are at invoice grain and exclude needs-review records.</p></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">Department</th><th className="px-3 py-2 text-right">Invoices</th><th className="px-3 py-2 text-right">Patients</th><th className="px-3 py-2 text-right">Net revenue</th><th className="px-3 py-2 text-right">Attributed invoices</th><th className="px-3 py-2 text-right">Attributed patients</th><th className="px-3 py-2 text-right">Attributed net</th><th className="px-3 py-2 text-right">Unattributed net</th><th className="px-3 py-2 text-right">Coverage</th><th className="px-3 py-2 text-right">Collection rate</th><th className="px-3 py-2 text-right">Outstanding</th><th className="px-3 py-2 text-right">Contribution</th></tr></thead><tbody>{departmentRows.map((row: any) => <tr key={row.department} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-3 py-2 font-medium">{row.department}</td><td className="px-3 py-2 text-right">{formatNumber(row.invoice_count)}</td><td className="px-3 py-2 text-right">{formatNumber(row.patient_count)}</td><td className="px-3 py-2 text-right">{formatBDT(row.net_revenue)}</td><td className="px-3 py-2 text-right">{formatNumber(row.attributed_invoice_count)}</td><td className="px-3 py-2 text-right">{formatNumber(row.attributed_patient_count)}</td><td className="px-3 py-2 text-right font-medium text-indigo-700">{formatBDT(row.attributed_net_revenue)}</td><td className="px-3 py-2 text-right">{formatBDT(row.unattributed_net_revenue)}</td><td className="px-3 py-2 text-right">{row.attribution_coverage.toFixed(1)}%</td><td className="px-3 py-2 text-right">{row.collection_rate.toFixed(1)}%</td><td className="px-3 py-2 text-right">{formatBDT(row.outstanding_revenue)}</td><td className="px-3 py-2 text-right">{formatBDT(row.contribution_margin)}</td></tr>)}{departmentRows.length === 0 && <tr><td colSpan={12} className="px-3 py-6 text-center text-slate-400">No department data for this period.</td></tr>}</tbody></table></div>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 shadow-sm">
        <div className="mb-4"><h2 className="text-sm font-semibold text-slate-900">Facebook-attributed revenue by department</h2><p className="mt-1 text-xs text-slate-600">Only invoices whose CRM-corrected patient resolves to <code>patient_marketing_attribution.validated_source = facebook</code> are included.</p></div>
        <div className="overflow-x-auto rounded-xl border border-blue-100 bg-white"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="px-3 py-2">Department</th><th className="px-3 py-2 text-right">Invoices</th><th className="px-3 py-2 text-right">Unique patients</th><th className="px-3 py-2 text-right">Net revenue</th><th className="px-3 py-2 text-right">Collected</th><th className="px-3 py-2 text-right">Outstanding</th><th className="px-3 py-2 text-right">Doctor share</th><th className="px-3 py-2 text-right">Contribution</th><th className="px-3 py-2 text-right">Avg invoice</th></tr></thead><tbody>{facebookDepartmentRows.filter((row: any) => row.attributed_invoice_count > 0).map((row: any) => <tr key={row.department} className="border-t border-slate-100 hover:bg-slate-50"><td className="px-3 py-2 font-medium">{row.department}</td><td className="px-3 py-2 text-right">{formatNumber(row.attributed_invoice_count)}</td><td className="px-3 py-2 text-right">{formatNumber(row.attributed_patient_count)}</td><td className="px-3 py-2 text-right font-semibold text-blue-700">{formatBDT(row.attributed_net_revenue)}</td><td className="px-3 py-2 text-right">{formatBDT(row.attributed_collected_revenue)}</td><td className="px-3 py-2 text-right">{formatBDT(row.attributed_outstanding_revenue)}</td><td className="px-3 py-2 text-right">{formatBDT(row.attributed_doctor_share_total)}</td><td className="px-3 py-2 text-right">{formatBDT(row.attributed_contribution_margin)}</td><td className="px-3 py-2 text-right">{formatBDT(row.attributed_invoice_count ? row.attributed_net_revenue / row.attributed_invoice_count : null)}</td></tr>)}{facebookDepartmentRows.every((row: any) => row.attributed_invoice_count === 0) && <tr><td colSpan={9} className="px-3 py-6 text-center text-slate-400">No Facebook-attributed department revenue for this period.</td></tr>}</tbody></table></div>
      </section>

      <section className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
        <div className="mb-4"><h2 className="text-sm font-semibold text-slate-900">Facebook attribution audit and validation</h2><p className="mt-1 text-xs text-slate-600">This control table tests duplicate invoices, patient deduplication, CRM correction precedence, and financial summation for the selected period.</p></div>
        <div className="overflow-x-auto rounded-xl border border-indigo-100 bg-white"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-xs uppercase text-slate-500"><tr><th className="px-4 py-2">Control</th><th className="px-4 py-2 text-right">Result</th><th className="px-4 py-2">Validation interpretation</th></tr></thead><tbody>{facebookAudit.map((row: any) => <tr key={row.control} className="border-t border-slate-100"><td className="px-4 py-2 font-medium text-slate-800">{row.control}</td><td className="px-4 py-2 text-right font-semibold">{typeof row.result === "number" ? row.result.toLocaleString("en-BD") : row.result}</td><td className="px-4 py-2 text-slate-600">{row.interpretation}</td></tr>)}</tbody></table></div>
      </section>
    </div>
  );
}
