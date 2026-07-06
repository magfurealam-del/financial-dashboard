import { notFound } from "next/navigation";
import { getInvoiceDetail } from "@/lib/queries/finance";
import { formatBDT, formatDateBD, formatDateTimeBD, formatPercent } from "@/lib/format";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoiceId = Number(id);
  if (!Number.isFinite(invoiceId)) notFound();

  const { invoice, lineItems, payments, discounts } = await getInvoiceDetail(invoiceId);
  if (!invoice) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold">Invoice {invoice.invoice_no}</h1>
        <p className="text-sm text-slate-500">{formatDateBD(invoice.invoice_date)} · {invoice.invoice_type} · {invoice.invoice_status}</p>
      </div>

      <section className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-4">
        <Field label="Patient" value={invoice.patient_name ?? "—"} />
        <Field label="Phone" value={invoice.patient_phone ?? "—"} />
        <Field label="Patient Type" value={invoice.patient_type ?? "—"} />
        <Field label="Department" value={invoice.department ?? "—"} />
        <Field label="Doctor" value={invoice.doctor_name ?? "—"} />
        <Field label="Specialty" value={invoice.doctor_specialty ?? "—"} />
        <Field label="Payment Status" value={invoice.payment_status} />
        <Field label="Reconciliation" value={invoice.reconciliation_status} />
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Gross" value={formatBDT(invoice.gross_amount)} />
        <Kpi label="Discount" value={formatBDT(invoice.discount_amount)} />
        <Kpi label="Refund" value={formatBDT(invoice.refund_amount)} />
        <Kpi label="Net" value={formatBDT(invoice.net_amount)} />
        <Kpi label="Collected" value={formatBDT(invoice.collected_amount)} />
        <Kpi label="Outstanding" value={formatBDT(invoice.outstanding_amount)} />
        <Kpi label="Doctor Share" value={formatBDT(invoice.doctor_share_total)} />
        <Kpi label="Contribution Margin" value={`${formatBDT(invoice.contribution_margin)} (${formatPercent(invoice.contribution_margin_pct)})`} />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-700">Line Items</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">Particulars</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2 text-right">Qty</th>
                <th className="px-3 py-2 text-right">Rate</th>
                <th className="px-3 py-2 text-right">Gross</th>
                <th className="px-3 py-2 text-right">Discount</th>
                <th className="px-3 py-2 text-right">Net</th>
                <th className="px-3 py-2 text-right">Doctor Share %</th>
                <th className="px-3 py-2 text-right">Doctor Share Amt</th>
                <th className="px-3 py-2 text-right">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((li: any) => (
                <tr key={li.line_item_id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{li.particulars}{li.needs_review && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">review</span>}</td>
                  <td className="px-3 py-2">{li.category_name ?? "Unmapped"}</td>
                  <td className="px-3 py-2 text-right">{li.qty}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.rate, true)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.gross_amount)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.discount_amount)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.net_amount)}</td>
                  <td className="px-3 py-2 text-right">{li.doctor_share_pct ? formatPercent(li.doctor_share_pct, 1) : "—"}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.doctor_share_amount)}</td>
                  <td className="px-3 py-2 text-right">{formatBDT(li.contribution_margin)}</td>
                </tr>
              ))}
              {lineItems.length === 0 && (
                <tr><td colSpan={10} className="px-3 py-6 text-center text-slate-400">No line items.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Payment History</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Mode</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p: any) => (
                  <tr key={p.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">{formatDateTimeBD(p.pay_date)}</td>
                    <td className="px-3 py-2">{p.pay_mode ?? p.pay_type ?? "—"}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(p.amount)}</td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr><td colSpan={3} className="px-3 py-6 text-center text-slate-400">No payments recorded.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-slate-700">Discounts</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Approved By</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((d: any) => (
                  <tr key={d.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">{formatDateBD(d.discount_date)}</td>
                    <td className="px-3 py-2">{d.discount_type ?? "—"}</td>
                    <td className="px-3 py-2">{d.approved_by ?? "—"}</td>
                    <td className="px-3 py-2 text-right">{formatBDT(d.amount)}</td>
                  </tr>
                ))}
                {discounts.length === 0 && (
                  <tr><td colSpan={4} className="px-3 py-6 text-center text-slate-400">No discounts recorded.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {invoice.needs_review && (
        <section className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Needs review:</strong> {invoice.review_reason ?? "Flagged during import/parsing."}
        </section>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
