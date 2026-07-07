import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FinanceFilters } from "@/lib/filters";

type InvoiceSummaryRow = {
  invoice_id: number;
  invoice_no: string;
  invoice_date: string | null;
  invoice_type: string;
  invoice_status: string;
  payment_status: string;
  department: string | null;
  patient_type: string | null;
  patient_id: number | null;
  patient_name: string | null;
  patient_phone: string | null;
  doctor_id: number | null;
  doctor_name: string | null;
  doctor_specialty: string | null;
  admission_id: number | null;
  admitted_on: string | null;
  discharged_on: string | null;
  gross_amount: number;
  discount_amount: number;
  refund_amount: number;
  net_amount: number;
  collected_amount: number;
  outstanding_amount: number;
  doctor_share_total: number | null;
  direct_cost_total: number | null;
  contribution_margin: number;
  contribution_margin_pct: number | null;
  adjusted_contribution_margin: number;
  reconciliation_status: string;
  reconciliation_delta: number | null;
  needs_review: boolean;
  review_reason: string | null;
  created_at: string;
  is_date_unknown_carryover: boolean;
  date_status_note: string | null;
};

function applyInvoiceFilters(query: any, filters: FinanceFilters) {
  query = query.gte("invoice_date", filters.dateFrom).lte("invoice_date", filters.dateTo);
  if (filters.department) query = query.eq("department", filters.department);
  if (filters.doctorId) query = query.eq("doctor_id", filters.doctorId);
  if (filters.patientId) query = query.eq("patient_id", filters.patientId);
  if (filters.patientType) query = query.eq("patient_type", filters.patientType);
  if (filters.paymentStatus) query = query.eq("payment_status", filters.paymentStatus);
  return query;
}

export async function getInvoiceSummaryRows(
  filters: FinanceFilters,
  opts: { page?: number; pageSize?: number; sortBy?: string; sortDir?: "asc" | "desc"; search?: string } = {}
): Promise<{ rows: InvoiceSummaryRow[]; count: number }> {
  const supabase = getSupabaseServerClient();
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 25;
  const sortBy = opts.sortBy ?? "invoice_date";
  const sortDir = opts.sortDir ?? "desc";

  let query = supabase
    .from("vw_finance_invoice_summary")
    .select("*", { count: "exact" });
  query = applyInvoiceFilters(query, filters);
  if (opts.search) {
    query = query.or(
      `invoice_no.ilike.%${opts.search}%,patient_name.ilike.%${opts.search}%,patient_phone.ilike.%${opts.search}%`
    );
  }
  query = query.order(sortBy, { ascending: sortDir === "asc" }).range(page * pageSize, page * pageSize + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { rows: (data ?? []) as InvoiceSummaryRow[], count: count ?? 0 };
}

export async function getInvoiceDetail(invoiceId: number) {
  const supabase = getSupabaseServerClient();
  const [{ data: invoice, error: invErr }, { data: lineItems, error: liErr }, { data: payments, error: payErr }, { data: discounts, error: discErr }] =
    await Promise.all([
      supabase.from("vw_finance_invoice_summary").select("*").eq("invoice_id", invoiceId).single(),
      supabase.from("vw_finance_line_item_summary").select("*").eq("invoice_id", invoiceId).order("line_item_id"),
      supabase.from("invoice_payments").select("*").eq("invoice_id", invoiceId).order("pay_date"),
      supabase.from("invoice_discounts").select("*").eq("invoice_id", invoiceId),
    ]);

  if (invErr) throw invErr;
  if (liErr) throw liErr;
  if (payErr) throw payErr;
  if (discErr) throw discErr;

  return { invoice, lineItems: lineItems ?? [], payments: payments ?? [], discounts: discounts ?? [] };
}

export async function getExecutiveSummary(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("vw_finance_invoice_summary").select(
    "gross_amount,discount_amount,refund_amount,net_amount,collected_amount,outstanding_amount,doctor_share_total,direct_cost_total,department,patient_id,invoice_id,patient_type"
  );
  query = applyInvoiceFilters(query, filters);
  const { data, error } = await query;
  if (error) throw error;

  const rows = data ?? [];
  const sum = (key: keyof (typeof rows)[number]) =>
    rows.reduce((acc, r: any) => acc + (Number(r[key]) || 0), 0);

  const grossRevenue = sum("gross_amount");
  const discountTotal = sum("discount_amount");
  const refundTotal = sum("refund_amount");
  const netRevenue = sum("net_amount");
  const collectedRevenue = sum("collected_amount");
  const outstandingRevenue = sum("outstanding_amount");
  const doctorShareTotal = sum("doctor_share_total");
  const directCostTotal = sum("direct_cost_total");
  const invoiceCount = new Set(rows.map((r: any) => r.invoice_id)).size;
  const patientCount = new Set(rows.filter((r: any) => r.patient_id).map((r: any) => r.patient_id)).size;

  const byDepartment: Record<string, number> = {};
  for (const r of rows as any[]) {
    const dept = r.department ?? "Unmapped";
    byDepartment[dept] = (byDepartment[dept] ?? 0) + (Number(r.net_amount) || 0);
  }

  return {
    grossRevenue,
    discountTotal,
    refundTotal,
    netRevenue,
    collectedRevenue,
    outstandingRevenue,
    doctorShareTotal,
    directCostTotal,
    invoiceCount,
    patientCount,
    byDepartment,
  };
}

export async function getDailySummary(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_daily_summary")
    .select("*")
    .gte("period_date", filters.dateFrom)
    .lte("period_date", filters.dateTo)
    .order("period_date");
  if (error) throw error;
  return data ?? [];
}

export async function getWeeklySummary(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_weekly_summary")
    .select("*")
    .gte("period_start", filters.dateFrom)
    .lte("period_start", filters.dateTo)
    .order("period_start");
  if (error) throw error;
  return data ?? [];
}

export async function getMonthlySummary(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_monthly_summary")
    .select("*")
    .gte("period_start", filters.dateFrom)
    .lte("period_start", filters.dateTo)
    .order("period_start");
  if (error) throw error;
  return data ?? [];
}

export async function getDepartmentSummary() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("vw_finance_department_summary").select("*").order("net_revenue", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getDoctorShareSummary() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_doctor_share_summary")
    .select("*")
    .order("net_revenue_attributed", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getOtBreakdown() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_ot_breakdown")
    .select("*")
    .order("net_revenue", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPatientSummary(opts: { page?: number; pageSize?: number; search?: string } = {}) {
  const supabase = getSupabaseServerClient();
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 25;
  let query = supabase.from("vw_finance_patient_summary").select("*", { count: "exact" });
  if (opts.search) {
    query = query.or(`patient_name.ilike.%${opts.search}%,patient_phone.ilike.%${opts.search}%`);
  }
  query = query.order("net_revenue", { ascending: false }).range(page * pageSize, page * pageSize + pageSize - 1);
  const { data, error, count } = await query;
  if (error) throw error;
  return { rows: data ?? [], count: count ?? 0 };
}

export async function getReconciliationIssues() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("vw_finance_reconciliation_issues").select("*").order("issue_type");
  if (error) throw error;
  return data ?? [];
}

export async function getValidationChecks() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("vw_finance_validation_checks").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function getDepartmentOptions() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("invoices").select("department").not("department", "is", null);
  if (error) throw error;
  return Array.from(new Set((data ?? []).map((r: any) => r.department))).sort();
}

export async function getDoctorOptions() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("doctors").select("id,name").eq("is_active", true).order("name");
  if (error) throw error;
  return data ?? [];
}
