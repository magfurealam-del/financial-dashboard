import { getValidationChecks } from "@/lib/queries/finance";
import { cn } from "@/lib/cn";
import { RefreshTableButton } from "@/components/RefreshTableButton";

const CHECK_LABELS: Record<string, string> = {
  invoice_total_matches_line_items: "Invoice total matches sum of line items",
  monthly_revenue_matches_invoice_total: "Monthly rollup matches invoice-level total",
  department_totals_reconcile_to_net_revenue: "Department totals reconcile to net revenue",
  doctor_share_reconciles_to_monthly_doctor_invoice: "Doctor share reconciles to monthly doctor invoice",
  contribution_margin_formula_correct: "Contribution margin formula is correct",
  void_cancelled_invoices_excluded: "Void/cancelled invoices excluded from reporting",
  outstanding_equals_net_minus_collected: "Outstanding = net revenue − collected revenue",
  discount_recorded_reflected_in_net_bill: "Recorded discounts are reflected in net bill",
  collection_rate_uses_collected_not_billed: "Collection rate uses collected, not billed, revenue",
  date_filters_use_invoice_date: "Date filters use invoice date by default",
};

const STATUS_STYLES: Record<string, string> = {
  pass: "bg-emerald-100 text-emerald-700",
  fail: "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  not_applicable: "bg-slate-100 text-slate-500",
};

export default async function ValidationPage() {
  const checks = await getValidationChecks();
  const passCount = checks.filter((c: any) => c.status === "pass").length;
  const failCount = checks.filter((c: any) => c.status === "fail").length;
  const warnCount = checks.filter((c: any) => c.status === "warning").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Data Validation / QA</h1>
          <p className="text-sm text-slate-500">
            Automated correctness checks against the invariants the dashboard's metric definitions depend on.
            Re-run any time by re-querying <code>vw_finance_validation_checks</code>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshTableButton />
          <a href="/api/export/validation" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 whitespace-nowrap">Export CSV</a>
        </div>
      </div>

      <div className="flex gap-3">
        <span className="rounded-md bg-emerald-100 px-3 py-1.5 text-sm text-emerald-700">{passCount} passing</span>
        {warnCount > 0 && <span className="rounded-md bg-amber-100 px-3 py-1.5 text-sm text-amber-700">{warnCount} warning</span>}
        {failCount > 0 && <span className="rounded-md bg-red-100 px-3 py-1.5 text-sm text-red-700">{failCount} failing</span>}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Check</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Expected</th>
              <th className="px-3 py-2 text-right">Actual</th>
              <th className="px-3 py-2">Detail</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c: any) => (
              <tr key={c.check_name} className="border-t border-slate-100 align-top">
                <td className="px-3 py-2 font-medium">{CHECK_LABELS[c.check_name] ?? c.check_name}</td>
                <td className="px-3 py-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs capitalize", STATUS_STYLES[c.status] ?? "bg-slate-100 text-slate-500")}>
                    {c.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-3 py-2 text-right whitespace-nowrap">{c.expected ?? "—"}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap">{c.actual ?? "—"}</td>
                <td className="px-3 py-2 text-slate-600">{c.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
