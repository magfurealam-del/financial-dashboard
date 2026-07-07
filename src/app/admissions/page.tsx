import Link from "next/link";
import { getAdmissionSummary, getIpdCurrentStatus, getIpdDailyCensus } from "@/lib/queries/finance";
import { formatBDT, formatDateTimeBD, formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import { IpdCensusChart } from "@/components/IpdCensusChart";

const PAGE_SIZE = 25;
const WARD_CATEGORIES = ["Female Ward", "Male Ward", "Single Cabin", "Shared Cabin", "VIP Ward"] as const;

export default async function AdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page ?? "0") || 0;
  const admissionType = typeof resolvedParams.type === "string" ? resolvedParams.type : "IPD";
  const [{ rows, count }, currentStatus, dailyCensus] = await Promise.all([
    getAdmissionSummary({ page, pageSize: PAGE_SIZE, admissionType: admissionType || undefined }),
    getIpdCurrentStatus(),
    getIpdDailyCensus(),
  ]);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  const wardCounts = WARD_CATEGORIES.reduce<Record<string, number>>((acc, w) => {
    acc[w] = currentStatus.filter((p: any) => p.ward_category === w).length;
    return acc;
  }, {});

  const doctorCounts = Object.entries(
    currentStatus.reduce<Record<string, number>>((acc, p: any) => {
      const name = p.doctor_name ?? "Unattributed";
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {})
  ).sort(([, a], [, b]) => b - a);

  const typeHref = (t: string) => `/admissions?type=${t}`;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">IPD Right Now</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-slate-900 bg-slate-900 p-3 text-white">
            <div className="text-xs uppercase text-slate-300">Total in IPD</div>
            <div className="text-2xl font-semibold">{currentStatus.length}</div>
          </div>
          {WARD_CATEGORIES.map((w) => (
            <div key={w} className="rounded-lg border border-slate-200 p-3">
              <div className="text-xs uppercase text-slate-500">{w}</div>
              <div className="text-2xl font-semibold">{wardCounts[w]}</div>
            </div>
          ))}
        </div>

        {doctorCounts.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-xs uppercase text-slate-500">Patients in IPD by Doctor</div>
            <div className="flex flex-wrap gap-2">
              {doctorCounts.map(([doctor, n]) => (
                <span key={doctor} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
                  {doctor}: <span className="font-semibold">{n}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <IpdCensusChart data={dailyCensus} />
      </section>

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
