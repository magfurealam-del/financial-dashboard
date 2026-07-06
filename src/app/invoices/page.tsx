import Link from "next/link";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { getInvoiceSummaryRows } from "@/lib/queries/finance";
import { formatBDT, formatDateBD, formatPercent } from "@/lib/format";

const PAGE_SIZE = 25;

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const filters = parseFiltersFromSearchParams(resolvedParams);
  const page = Number(resolvedParams.page ?? "0") || 0;
  const search = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;

  const { rows, count } = await getInvoiceSummaryRows(filters, { page, pageSize: PAGE_SIZE, search });
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const qs = new URLSearchParams(resolvedParams as Record<string, string>);

  const pageHref = (p: number) => {
    const params = new URLSearchParams(qs);
    params.set("page", String(p));
    return `/invoices?${params.toString()}`;
  };

  const exportHref = `/api/export/invoices?${new URLSearchParams({ ...(resolvedParams as Record<string, string>) }).toString()}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Invoices</h1>
          <p className="text-sm text-slate-500">{count} invoices in this period</p>
        </div>
        <div className="flex items-center gap-2">
          <form action="/invoices" method="get" className="flex items-center gap-2">
            {Object.entries(resolvedParams).map(([k, v]) =>
              k !== "q" && k !== "page" && typeof v === "string" ? <input key={k} type="hidden" name={k} value={v} /> : null
            )}
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Search invoice #, patient, phone…"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
            />
            <button type="submit" className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Search</button>
          </form>
          <a href={exportHref} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Invoice #</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Patient</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Doctor</th>
              <th className="px-3 py-2 text-right">Net</th>
              <th className="px-3 py-2 text-right">Collected</th>
              <th className="px-3 py-2 text-right">Outstanding</th>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">CM%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.invoice_id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2">
                  <Link href={`/invoices/${r.invoice_id}`} className="font-medium text-blue-700 hover:underline">
                    {r.invoice_no}
                  </Link>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {r.invoice_date ? (
                    formatDateBD(r.invoice_date)
                  ) : (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700" title={r.date_status_note ?? undefined}>
                      date unknown (historical carryover)
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">{r.patient_name ?? "—"}</td>
                <td className="px-3 py-2">{r.patient_type ?? "—"}</td>
                <td className="px-3 py-2">{r.department ?? "—"}</td>
                <td className="px-3 py-2">{r.doctor_name ?? "—"}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.net_amount)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.collected_amount)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.outstanding_amount)}</td>
                <td className="px-3 py-2 capitalize">{r.payment_status}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                <td className="px-3 py-2 text-right">{formatPercent(r.contribution_margin_pct)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-slate-400">No invoices found for these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Page {page + 1} of {totalPages}</span>
        <div className="flex gap-2">
          <Link
            href={pageHref(Math.max(0, page - 1))}
            className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100 aria-disabled:opacity-40"
            aria-disabled={page === 0}
          >
            Previous
          </Link>
          <Link
            href={pageHref(Math.min(totalPages - 1, page + 1))}
            className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100 aria-disabled:opacity-40"
            aria-disabled={page >= totalPages - 1}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
