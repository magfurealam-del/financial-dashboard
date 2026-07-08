import Link from "next/link";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { getDailySummary, getWeeklySummary, getMonthlySummary } from "@/lib/queries/finance";
import { formatBDT, formatNumber, formatPercent, formatDateBD } from "@/lib/format";
import { cn } from "@/lib/cn";
import { TrendChart } from "@/components/TrendChart";
import { RefreshTableButton } from "@/components/RefreshTableButton";

type Granularity = "daily" | "weekly" | "monthly";

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const granularity = (typeof resolvedParams.granularity === "string" ? resolvedParams.granularity : "daily") as Granularity;

  const rows =
    granularity === "weekly"
      ? await getWeeklySummary(filters)
      : granularity === "monthly"
        ? await getMonthlySummary(filters)
        : await getDailySummary(filters);

  const periodKey = granularity === "monthly" ? "period_label" : granularity === "weekly" ? "period_start" : "period_date";
  const labelFmt = (r: any) => (granularity === "monthly" ? r.period_label : formatDateBD(r[periodKey]));

  const chartData = rows.map((r: any) => ({
    label: labelFmt(r),
    "Net Revenue": Number(r.net_revenue) || 0,
    "Collected Revenue": Number(r.collected_revenue) || 0,
    "Contribution Margin": Number(r.contribution_margin) || 0,
    "Doctor Share": Number(r.doctor_share_total) || 0,
  }));

  const qs = new URLSearchParams(resolvedParams as Record<string, string>);
  const granHref = (g: Granularity) => {
    const p = new URLSearchParams(qs);
    p.set("granularity", g);
    return `/trends?${p.toString()}`;
  };

  function periodInvoicesHref(r: any): string {
    const p = new URLSearchParams(qs);
    p.delete("granularity");
    let from: string;
    let to: string;
    if (granularity === "monthly") {
      from = r.period_start;
      const end = new Date(r.period_start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      to = end.toISOString().slice(0, 10);
    } else if (granularity === "weekly") {
      from = r.period_start;
      to = r.period_end;
    } else {
      from = r.period_date;
      to = r.period_date;
    }
    p.set("from", from);
    p.set("to", to);
    return `/invoices?${p.toString()}`;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Revenue Trends</h1>
          <p className="text-sm text-slate-500">
            {filters.dateFrom} to {filters.dateTo}. Adjust the filter bar above, then click Update Table.
          </p>
        </div>
        <div className="flex items-center gap-2">
        <RefreshTableButton />
        <div className="flex gap-1 rounded-md border border-slate-300 bg-white p-1">
          {(["daily", "weekly", "monthly"] as Granularity[]).map((g) => (
            <Link
              key={g}
              href={granHref(g)}
              className={cn("rounded px-3 py-1 text-sm capitalize", granularity === g ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100")}
            >
              {g}
            </Link>
          ))}
        </div>
        </div>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Net Revenue, Collections &amp; Contribution Margin</h2>
        <TrendChart
          data={chartData}
          xKey="label"
          lines={[
            { key: "Net Revenue", label: "Net Revenue", color: "#2563eb" },
            { key: "Collected Revenue", label: "Collected Revenue", color: "#16a34a" },
            { key: "Contribution Margin", label: "Contribution Margin", color: "#9333ea" },
            { key: "Doctor Share", label: "Doctor Share", color: "#ea580c" },
          ]}
        />
      </section>

      <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Period</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-3 py-2 text-right">Patients</th>
              <th className="px-3 py-2 text-right">Gross</th>
              <th className="px-3 py-2 text-right">Net</th>
              <th className="px-3 py-2 text-right">Collected</th>
              <th className="px-3 py-2 text-right">Outstanding</th>
              <th className="px-3 py-2 text-right">Discounts</th>
              <th className="px-3 py-2 text-right">Refunds</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">Contribution</th>
              <th className="px-3 py-2 text-right">CM%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, idx: number) => {
              const cmPct = r.net_revenue ? (r.contribution_margin / r.net_revenue) * 100 : null;
              return (
                <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">
                    <Link href={periodInvoicesHref(r)} className="text-blue-700 hover:underline">
                      {labelFmt(r)}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                  <td className="px-3 py-2 text-right">{formatNumber(r.patient_count)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.gross_revenue)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.collected_revenue)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.outstanding_revenue)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.discount_total)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.refund_total)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                  <td className="px-3 py-2 text-right">{formatPercent(cmPct)}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={12} className="px-3 py-6 text-center text-slate-400">No data in this period.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
