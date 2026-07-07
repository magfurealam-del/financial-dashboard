import Link from "next/link";
import { getPatientSummary } from "@/lib/queries/finance";
import { formatBDT, formatDateBD, formatNumber } from "@/lib/format";

const PAGE_SIZE = 25;

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page ?? "0") || 0;
  const search = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;
  const { rows, count } = await getPatientSummary({ page, pageSize: PAGE_SIZE, search });
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Patient Revenue</h1>
          <p className="text-sm text-slate-500">{count} patients with billing history</p>
        </div>
        <div className="flex items-center gap-2">
          <form action="/patients" method="get" className="flex items-center gap-2">
            <input type="text" name="q" defaultValue={search} placeholder="Search name or phone…" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm" />
            <button type="submit" className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white">Search</button>
          </form>
          <a href={`/api/export/patients${search ? `?q=${encodeURIComponent(search)}` : ""}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Patient</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">First Visit</th>
              <th className="px-3 py-2">Last Visit</th>
              <th className="px-3 py-2 text-right">Invoices</th>
              <th className="px-3 py-2 text-right">Net Revenue</th>
              <th className="px-3 py-2 text-right">Collected</th>
              <th className="px-3 py-2 text-right">Outstanding</th>
              <th className="px-3 py-2 text-right">Doctor Share</th>
              <th className="px-3 py-2 text-right">Contribution</th>
              <th className="px-3 py-2">Repeat?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.patient_id} className="border-t border-slate-100">
                <td className="px-3 py-2 font-medium">{r.patient_name ?? "—"}</td>
                <td className="px-3 py-2">{r.patient_phone ?? "—"}</td>
                <td className="px-3 py-2">{formatDateBD(r.first_visit_date)}</td>
                <td className="px-3 py-2">{formatDateBD(r.last_visit_date)}</td>
                <td className="px-3 py-2 text-right">{formatNumber(r.invoice_count)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.net_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.collected_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.outstanding_revenue)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.doctor_share_total)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                <td className="px-3 py-2">{r.is_repeat_patient ? "Yes" : "No"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={11} className="px-3 py-6 text-center text-slate-400">No patients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Page {page + 1} of {totalPages}</span>
        <div className="flex gap-2">
          <Link href={`/patients?page=${Math.max(0, page - 1)}${search ? `&q=${search}` : ""}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">Previous</Link>
          <Link href={`/patients?page=${Math.min(totalPages - 1, page + 1)}${search ? `&q=${search}` : ""}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">Next</Link>
        </div>
      </div>
    </div>
  );
}
