import { getReconciliationIssues } from "@/lib/queries/finance";
import { cn } from "@/lib/cn";
import { RefreshTableButton } from "@/components/RefreshTableButton";

const ISSUE_LABELS: Record<string, string> = {
  invoice_missing_patient: "Invoice missing patient",
  invoice_missing_department: "Invoice missing department",
  invoice_missing_doctor: "Invoice missing doctor (revenue-share items present)",
  line_item_missing_category: "Line item missing service category",
  negative_revenue_line: "Negative revenue line item",
  paid_exceeds_invoice: "Paid amount exceeds invoice total",
  missing_payment_status: "Missing payment status",
  revenue_share_missing_pct: "Revenue-share item missing doctor share %",
  duplicate_invoice_no: "Duplicate invoice number",
  duplicate_patient_phone: "Duplicate patient phone",
};

export default async function ReconciliationPage() {
  const issues = await getReconciliationIssues();
  const grouped = issues.reduce<Record<string, typeof issues>>((acc, issue: any) => {
    (acc[issue.issue_type] ??= []).push(issue);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Data Quality / Reconciliation</h1>
          <p className="text-sm text-slate-500">{issues.length} exceptions found across all invoices and line items.</p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshTableButton />
          <a href="/api/export/reconciliation" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
        </div>
      </div>

      {Object.entries(grouped).map(([type, rows]) => (
        <section key={type}>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            {ISSUE_LABELS[type] ?? type}
            <span className={cn("rounded-full px-2 py-0.5 text-xs", rows.length > 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500")}>
              {rows.length}
            </span>
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Record ID</th>
                  <th className="px-3 py-2">Reference</th>
                  <th className="px-3 py-2">Detail</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((r: any, idx: number) => (
                  <tr key={`${r.record_id}-${idx}`} className="border-t border-slate-100">
                    <td className="px-3 py-2">{r.record_id}</td>
                    <td className="px-3 py-2">{r.reference ?? "—"}</td>
                    <td className="px-3 py-2">{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 50 && (
              <div className="border-t border-slate-100 px-3 py-2 text-xs text-slate-400">
                Showing first 50 of {rows.length}. Export via Supabase SQL editor for the full list.
              </div>
            )}
          </div>
        </section>
      ))}

      {issues.length === 0 && <p className="text-sm text-slate-400">No reconciliation issues found.</p>}
    </div>
  );
}
