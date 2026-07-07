import Link from "next/link";
import { getAdmissionSummary } from "@/lib/queries/finance";
import { formatBDT, formatDateTimeBD, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 25;

export default async function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page ?? "0") || 0;
  const admissionType = typeof resolvedParams.type === "string" ? resolvedParams.type : "IPD";
  const { rows, count } = await getAdmissionSummary({ page, pageSize: PAGE_SIZE, admissionType: admissionType || undefined });
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  const typeHref = (t: string) => `/admissions?type=${t}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Admissions — Ward / Bed / Length of Stay</h1>
          <p className="text-sm text-slate-500">
            {count} admission{count === 1 ? "" : "s"}. <code>Daycare</code> covers all non-inpatient case types
            (OPD/Consultancy/Pharmacy/Therapy/Lab); <code>IPD</code> is true inpatient admissions with ward/bed/length
            of stay.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-md border border-slate-300 bg-white p-1">
            {["IPD", "Daycare", ""].map((t) => (
              <Link
                key={t || "all"}
                href={typeHref(t)}
                className={cn(
                  "rounded px-3 py-1 text-sm",
                  admissionType === t ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {t || "All"}
              </Link>
            ))}
          </div>
          <a href={`/api/export/admissions${admissionType ? `?type=${admissionType}` : ""}`} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">Export CSV</a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Admission #</th>
              <th className="px-3 py-2">Patient</th>
              <th className="px-3 py-2">Doctor</th>
              <th className="px-3 py-2">Ward</th>
              <th className="px-3 py-2">Bed</th>
              <th className="px-3 py-2">Admitted</th>
              <th className="px-3 py-2">Discharged</th>
              <th className="px-3 py-2 text-right">LOS (days)</th>
              <th className="px-3 py-2 text-right">Net Revenue</th>
              <th className="px-3 py-2 text-right">Contribution</th>
              <th className="px-3 py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.admission_id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 font-medium">{r.an}</td>
                <td className="px-3 py-2">{r.patient_name ?? "—"}</td>
                <td className="px-3 py-2">{r.doctor_name ?? "—"}</td>
                <td className="px-3 py-2">{r.ward_name ?? "—"}</td>
                <td className="px-3 py-2">{r.bed_name ?? "—"}</td>
                <td className="px-3 py-2 whitespace-nowrap">{formatDateTimeBD(r.admitted_on)}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.discharged_on ? formatDateTimeBD(r.discharged_on) : "—"}</td>
                <td className="px-3 py-2 text-right">{r.length_of_stay_days ?? "—"}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.net_amount ?? r.net_bill)}</td>
                <td className="px-3 py-2 text-right">{formatBDT(r.contribution_margin)}</td>
                <td className="px-3 py-2">
                  {r.invoice_id ? (
                    <Link href={`/invoices/${r.invoice_id}`} className="text-blue-700 hover:underline">
                      {r.invoice_no}
                    </Link>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={11} className="px-3 py-6 text-center text-slate-400">No admissions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">Page {page + 1} of {totalPages} ({formatNumber(count)} total)</span>
        <div className="flex gap-2">
          <Link href={`/admissions?type=${admissionType}&page=${Math.max(0, page - 1)}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">Previous</Link>
          <Link href={`/admissions?type=${admissionType}&page=${Math.min(totalPages - 1, page + 1)}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-100">Next</Link>
        </div>
      </div>
    </div>
  );
}
