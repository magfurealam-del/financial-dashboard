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

  // When filtering by department (including the synthetic "Diagnostics" bucket), use the
  // department-split view so displayed/summed amounts reconcile exactly with the Departments tab
  // instead of showing whole-invoice totals for invoices that also have diagnostics line items.
  const sourceView = filters.department ? "vw_finance_invoice_department_split" : "vw_finance_invoice_summary";
  let query = supabase
    .from(sourceView)
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

  let admission = null;
  if (invoice?.admission_id) {
    const { data, error } = await supabase
      .from("vw_finance_admission_summary")
      .select("admission_id, an, ward_name, bed_name, admission_type, admitted_on, discharged_on, length_of_stay_days")
      .eq("admission_id", invoice.admission_id)
      .single();
    if (!error) admission = data;
  }

  return { invoice, lineItems: lineItems ?? [], payments: payments ?? [], discounts: discounts ?? [], admission };
}

/** Diagnostics (PATHOLOGY + ADVANCED DIAGNOSTICS categories) net/gross/discount/doctor-share per invoice, for carving Diagnostics out of whichever department the invoice was billed under. */
async function getDiagnosticsLineTotalsByInvoice(invoiceIds: number[]) {
  const result = new Map<number, { net: number; gross: number; discount: number; doctorShare: number }>();
  if (invoiceIds.length === 0) return result;
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_line_item_summary")
    .select("invoice_id,net_amount,gross_amount,discount_amount,doctor_share_amount")
    .eq("category_group", "Diagnostics")
    .in("invoice_id", invoiceIds);
  if (error) throw error;
  for (const r of (data ?? []) as any[]) {
    const entry = result.get(r.invoice_id) ?? { net: 0, gross: 0, discount: 0, doctorShare: 0 };
    entry.net += Number(r.net_amount) || 0;
    entry.gross += Number(r.gross_amount) || 0;
    entry.discount += Number(r.discount_amount) || 0;
    entry.doctorShare += Number(r.doctor_share_amount) || 0;
    result.set(r.invoice_id, entry);
  }
  return result;
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

  const diagByInvoice = await getDiagnosticsLineTotalsByInvoice(rows.map((r: any) => r.invoice_id));
  const byDepartment: Record<string, number> = {};
  for (const r of rows as any[]) {
    const dept = r.department ?? "Unmapped";
    const diagNet = diagByInvoice.get(r.invoice_id)?.net ?? 0;
    const netAmount = Number(r.net_amount) || 0;
    if (diagNet > 0) {
      byDepartment["Diagnostics"] = (byDepartment["Diagnostics"] ?? 0) + diagNet;
      byDepartment[dept] = (byDepartment[dept] ?? 0) + (netAmount - diagNet);
    } else {
      byDepartment[dept] = (byDepartment[dept] ?? 0) + netAmount;
    }
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

export async function getDepartmentSummaryFiltered(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("vw_finance_invoice_summary")
    .select("department,invoice_id,patient_id,gross_amount,net_amount,collected_amount,discount_amount,refund_amount,outstanding_amount,doctor_share_total")
    .not("department", "is", null);
  query = applyInvoiceFilters(query, filters);
  const { data, error } = await query;
  if (error) throw error;

  const byDept = new Map<
    string,
    {
      invoiceIds: Set<number>;
      patientIds: Set<number>;
      gross: number;
      net: number;
      collected: number;
      discount: number;
      refund: number;
      outstanding: number;
      doctorShare: number;
    }
  >();

  const rows = (data ?? []) as any[];
  const diagByInvoice = await getDiagnosticsLineTotalsByInvoice(rows.map((r) => r.invoice_id));

  function addTo(key: string, invoiceId: number, patientId: number | null, gross: number, net: number, collected: number, discount: number, refund: number, outstanding: number, doctorShare: number) {
    if (!byDept.has(key)) {
      byDept.set(key, { invoiceIds: new Set(), patientIds: new Set(), gross: 0, net: 0, collected: 0, discount: 0, refund: 0, outstanding: 0, doctorShare: 0 });
    }
    const entry = byDept.get(key)!;
    entry.invoiceIds.add(invoiceId);
    if (patientId) entry.patientIds.add(patientId);
    entry.gross += gross;
    entry.net += net;
    entry.collected += collected;
    entry.discount += discount;
    entry.refund += refund;
    entry.outstanding += outstanding;
    entry.doctorShare += doctorShare;
  }

  for (const r of rows) {
    const dept = r.department as string;
    const gross = Number(r.gross_amount) || 0;
    const net = Number(r.net_amount) || 0;
    const collected = Number(r.collected_amount) || 0;
    const discount = Number(r.discount_amount) || 0;
    const refund = Number(r.refund_amount) || 0;
    const outstanding = Number(r.outstanding_amount) || 0;
    const doctorShare = Number(r.doctor_share_total) || 0;
    const diag = diagByInvoice.get(r.invoice_id);

    if (diag && diag.net > 0) {
      const fraction = net > 0 ? diag.net / net : 0;
      addTo("Diagnostics", r.invoice_id, r.patient_id, diag.gross, diag.net, collected * fraction, diag.discount, refund * fraction, outstanding * fraction, diag.doctorShare);
      addTo(dept, r.invoice_id, r.patient_id, gross - diag.gross, net - diag.net, collected * (1 - fraction), discount - diag.discount, refund * (1 - fraction), outstanding * (1 - fraction), doctorShare - diag.doctorShare);
    } else {
      addTo(dept, r.invoice_id, r.patient_id, gross, net, collected, discount, refund, outstanding, doctorShare);
    }
  }

  return Array.from(byDept.entries())
    .map(([department, v]) => {
      const invoiceCount = v.invoiceIds.size;
      const contributionMargin = v.net - v.doctorShare;
      return {
        department,
        invoice_count: invoiceCount,
        patient_count: v.patientIds.size,
        gross_revenue: v.gross,
        net_revenue: v.net,
        collected_revenue: v.collected,
        discount_total: v.discount,
        refund_total: v.refund,
        outstanding_revenue: v.outstanding,
        doctor_share_total: v.doctorShare,
        contribution_margin: contributionMargin,
        contribution_margin_pct: v.net ? (contributionMargin / v.net) * 100 : null,
        avg_invoice_value: invoiceCount ? v.net / invoiceCount : null,
      };
    })
    .sort((a, b) => b.net_revenue - a.net_revenue);
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

export async function getIpdCurrentStatus() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("vw_finance_ipd_current_status").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function getIpdDailyCensus() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_ipd_daily_census")
    .select("*")
    .order("census_date");
  if (error) throw error;
  return data ?? [];
}

export async function getAdmissionSummary(opts: { page?: number; pageSize?: number; admissionType?: string } = {}) {
  const supabase = getSupabaseServerClient();
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 25;
  let query = supabase.from("vw_finance_admission_summary").select("*", { count: "exact" });
  if (opts.admissionType) query = query.eq("admission_type", opts.admissionType);
  query = query.order("admitted_on", { ascending: false, nullsFirst: false }).range(page * pageSize, page * pageSize + pageSize - 1);
  const { data, error, count } = await query;
  if (error) throw error;
  return { rows: data ?? [], count: count ?? 0 };
}

export async function getMarketingSourceSummary() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vw_finance_marketing_source_summary")
    .select("*")
    .order("net_revenue", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getDepartmentOptions() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("invoices").select("department").not("department", "is", null);
  if (error) throw error;
  // "Diagnostics" is a synthetic bucket carved out of whichever department a diagnostics line item
  // was billed under (see vw_finance_invoice_department_split) - not a raw invoices.department value.
  const raw = Array.from(new Set((data ?? []).map((r: any) => r.department))).sort();
  return ["Diagnostics", ...raw];
}

export async function getDoctorOptions() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("doctors").select("id,name").eq("is_active", true).order("name");
  if (error) throw error;
  return data ?? [];
}
