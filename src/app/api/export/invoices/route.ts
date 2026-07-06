import { NextRequest, NextResponse } from "next/server";
import { getInvoiceSummaryRows } from "@/lib/queries/finance";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { toCsv } from "@/lib/csv";

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const filters = parseFiltersFromSearchParams(searchParams);
  const { rows } = await getInvoiceSummaryRows(filters, { page: 0, pageSize: 10000, search: searchParams.q });

  const csv = toCsv(
    rows.map((r) => ({
      invoice_no: r.invoice_no,
      invoice_date: r.invoice_date,
      patient_name: r.patient_name,
      patient_phone: r.patient_phone,
      patient_type: r.patient_type,
      department: r.department,
      doctor_name: r.doctor_name,
      gross_amount: r.gross_amount,
      discount_amount: r.discount_amount,
      refund_amount: r.refund_amount,
      net_amount: r.net_amount,
      collected_amount: r.collected_amount,
      outstanding_amount: r.outstanding_amount,
      payment_status: r.payment_status,
      invoice_status: r.invoice_status,
      doctor_share_total: r.doctor_share_total,
      contribution_margin: r.contribution_margin,
      contribution_margin_pct: r.contribution_margin_pct,
    }))
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="invoices_${filters.dateFrom}_to_${filters.dateTo}.csv"`,
    },
  });
}
