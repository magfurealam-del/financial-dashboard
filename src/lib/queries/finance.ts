import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { FinanceFilters } from "@/lib/filters";
import { unstable_cache } from "next/cache";

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

async function getExecutiveSummaryUncached(filters: FinanceFilters) {
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

export const getExecutiveSummary = (filters: FinanceFilters) => unstable_cache(
  () => getExecutiveSummaryUncached(filters), ["finance-executive", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

async function getDailySummaryUncached(filters: FinanceFilters) {
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
export const getDailySummary = (filters: FinanceFilters) => unstable_cache(
  () => getDailySummaryUncached(filters), ["finance-daily", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

async function getWeeklySummaryUncached(filters: FinanceFilters) {
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
export const getWeeklySummary = (filters: FinanceFilters) => unstable_cache(
  () => getWeeklySummaryUncached(filters), ["finance-weekly", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

async function getMonthlySummaryUncached(filters: FinanceFilters) {
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
export const getMonthlySummary = (filters: FinanceFilters) => unstable_cache(
  () => getMonthlySummaryUncached(filters), ["finance-monthly", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

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

export async function getPatientSummaryFiltered(
  filters: FinanceFilters,
  opts: { page?: number; pageSize?: number; search?: string } = {}
) {
  const supabase = getSupabaseServerClient();
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 25;

  let query = supabase
    .from("vw_finance_invoice_summary")
    .select("patient_id,patient_name,patient_phone,invoice_id,invoice_date,gross_amount,net_amount,collected_amount,outstanding_amount,doctor_share_total")
    .not("patient_id", "is", null);
  query = applyInvoiceFilters(query, filters);
  const { data, error } = await query;
  if (error) throw error;

  const byPatient = new Map<
    number,
    { name: string | null; phone: string | null; invoiceIds: Set<number>; firstVisit: string | null; lastVisit: string | null; gross: number; net: number; collected: number; outstanding: number; doctorShare: number }
  >();
  for (const r of (data ?? []) as any[]) {
    if (!byPatient.has(r.patient_id)) {
      byPatient.set(r.patient_id, { name: r.patient_name, phone: r.patient_phone, invoiceIds: new Set(), firstVisit: null, lastVisit: null, gross: 0, net: 0, collected: 0, outstanding: 0, doctorShare: 0 });
    }
    const entry = byPatient.get(r.patient_id)!;
    entry.invoiceIds.add(r.invoice_id);
    if (r.invoice_date) {
      if (!entry.firstVisit || r.invoice_date < entry.firstVisit) entry.firstVisit = r.invoice_date;
      if (!entry.lastVisit || r.invoice_date > entry.lastVisit) entry.lastVisit = r.invoice_date;
    }
    entry.gross += Number(r.gross_amount) || 0;
    entry.net += Number(r.net_amount) || 0;
    entry.collected += Number(r.collected_amount) || 0;
    entry.outstanding += Number(r.outstanding_amount) || 0;
    entry.doctorShare += Number(r.doctor_share_total) || 0;
  }

  let allRows = Array.from(byPatient.entries()).map(([patientId, v]) => ({
    patient_id: patientId,
    patient_name: v.name,
    patient_phone: v.phone,
    first_visit_date: v.firstVisit,
    last_visit_date: v.lastVisit,
    invoice_count: v.invoiceIds.size,
    gross_revenue: v.gross,
    net_revenue: v.net,
    collected_revenue: v.collected,
    outstanding_revenue: v.outstanding,
    doctor_share_total: v.doctorShare,
    contribution_margin: v.net - v.doctorShare,
    is_repeat_patient: v.invoiceIds.size > 1,
  }));

  if (opts.search) {
    const q = opts.search.toLowerCase();
    allRows = allRows.filter((r) => r.patient_name?.toLowerCase().includes(q) || r.patient_phone?.toLowerCase().includes(q));
  }

  allRows.sort((a, b) => b.net_revenue - a.net_revenue);
  const count = allRows.length;
  const rows = allRows.slice(page * pageSize, page * pageSize + pageSize);
  return { rows, count };
}

export async function getDoctorShareSummaryFiltered(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("vw_finance_invoice_summary")
    .select("doctor_id,doctor_name,doctor_specialty,invoice_id,gross_amount,net_amount,doctor_share_total")
    .not("doctor_id", "is", null);
  query = applyInvoiceFilters(query, filters);
  const { data, error } = await query;
  if (error) throw error;

  const byDoctor = new Map<
    number,
    { doctorName: string; specialty: string | null; invoiceIds: Set<number>; gross: number; net: number; doctorShare: number }
  >();
  for (const r of (data ?? []) as any[]) {
    if (!byDoctor.has(r.doctor_id)) {
      byDoctor.set(r.doctor_id, { doctorName: r.doctor_name, specialty: r.doctor_specialty, invoiceIds: new Set(), gross: 0, net: 0, doctorShare: 0 });
    }
    const entry = byDoctor.get(r.doctor_id)!;
    entry.invoiceIds.add(r.invoice_id);
    entry.gross += Number(r.gross_amount) || 0;
    entry.net += Number(r.net_amount) || 0;
    entry.doctorShare += Number(r.doctor_share_total) || 0;
  }

  return Array.from(byDoctor.entries())
    .map(([doctorId, v]) => {
      const contributionAfterShare = v.net - v.doctorShare;
      return {
        doctor_id: doctorId,
        doctor_name: v.doctorName,
        doctor_specialty: v.specialty,
        invoice_count: v.invoiceIds.size,
        gross_revenue_attributed: v.gross,
        net_revenue_attributed: v.net,
        doctor_share_amount: v.doctorShare,
        contribution_after_share: contributionAfterShare,
        contribution_margin_pct: v.net ? (contributionAfterShare / v.net) * 100 : null,
      };
    })
    .sort((a, b) => b.net_revenue_attributed - a.net_revenue_attributed);
}

export async function getOtBreakdownFiltered(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("vw_finance_line_item_summary")
    .select("invoice_id,invoice_date,department,patient_type,payment_status,doctor_id,doctor_name,ot_subcategory,net_amount,doctor_share_amount")
    .not("ot_subcategory", "is", null);
  query = query.gte("invoice_date", filters.dateFrom).lte("invoice_date", filters.dateTo);
  if (filters.department) query = query.eq("department", filters.department);
  if (filters.doctorId) query = query.eq("doctor_id", filters.doctorId);
  if (filters.patientType) query = query.eq("patient_type", filters.patientType);
  if (filters.paymentStatus) query = query.eq("payment_status", filters.paymentStatus);
  const { data, error } = await query;
  if (error) throw error;

  const byKey = new Map<
    string,
    { doctorId: number | null; doctorName: string; otSubcategory: string; invoiceIds: Set<number>; lineItemCount: number; net: number; doctorShare: number }
  >();
  for (const r of (data ?? []) as any[]) {
    const key = `${r.doctor_id ?? "none"}::${r.ot_subcategory}`;
    if (!byKey.has(key)) {
      byKey.set(key, { doctorId: r.doctor_id, doctorName: r.doctor_name ?? "Unattributed", otSubcategory: r.ot_subcategory, invoiceIds: new Set(), lineItemCount: 0, net: 0, doctorShare: 0 });
    }
    const entry = byKey.get(key)!;
    entry.invoiceIds.add(r.invoice_id);
    entry.lineItemCount += 1;
    entry.net += Number(r.net_amount) || 0;
    entry.doctorShare += Number(r.doctor_share_amount) || 0;
  }

  return Array.from(byKey.values())
    .map((v) => ({
      doctor_id: v.doctorId,
      doctor_name: v.doctorName,
      ot_subcategory: v.otSubcategory,
      invoice_count: v.invoiceIds.size,
      line_item_count: v.lineItemCount,
      net_revenue: v.net,
      doctor_share_total: v.doctorShare,
    }))
    .sort((a, b) => b.net_revenue - a.net_revenue);
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

export async function getAdmissionSummary(
  opts: { page?: number; pageSize?: number; admissionType?: string; filters?: FinanceFilters } = {}
) {
  const supabase = getSupabaseServerClient();
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 25;
  let query = supabase.from("vw_finance_admission_summary").select("*", { count: "exact" });
  if (opts.admissionType) query = query.eq("admission_type", opts.admissionType);
  if (opts.filters) {
    query = query.gte("admitted_on", opts.filters.dateFrom).lte("admitted_on", `${opts.filters.dateTo}T23:59:59`);
    if (opts.filters.doctorId) query = query.eq("doctor_id", opts.filters.doctorId);
  }
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

async function getMarketingSourceSummaryFilteredUncached(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();

  let invoiceQuery = supabase
    .from("vw_finance_invoice_summary")
    .select("invoice_id,invoice_no,department,doctor_id,patient_type,payment_status,patient_id,gross_amount,net_amount,collected_amount,doctor_share_total,reconciliation_status");
  invoiceQuery = applyInvoiceFilters(invoiceQuery, filters);
  const { data: invoiceRows, error: invErr } = await invoiceQuery;
  if (invErr) throw invErr;

  const validInvoices = (invoiceRows ?? []).filter((r: any) => r.reconciliation_status !== "needs_review");
  const invoiceNos = validInvoices.map((r: any) => r.invoice_no).filter(Boolean);
  const { data: reconciliations, error: reconciliationError } = invoiceNos.length
    ? await supabase
        .from("crm_invoice_reconciliation")
        .select("invoice_no,patient_id,crm_log_id,match_method,match_status,source_truth,updated_at")
        .in("invoice_no", invoiceNos)
        .in("match_status", ["matched", "approved_auto"])
    : { data: [], error: null };
  if (reconciliationError) throw reconciliationError;

  const reconciliationByInvoice = new Map<string, any>();
  for (const row of (reconciliations ?? []) as any[]) {
    const current = reconciliationByInvoice.get(row.invoice_no);
    if (!current || new Date(row.updated_at ?? 0).getTime() > new Date(current.updated_at ?? 0).getTime()) {
      reconciliationByInvoice.set(row.invoice_no, row);
    }
  }

  // Include both raw invoice patients and CRM-corrected patients before loading
  // the canonical attribution rollup. Otherwise corrected invoice identities can
  // be missed and the Marketing summary can disagree with its audit controls.
  const patientIds = Array.from(new Set([
    ...validInvoices.map((r: any) => r.patient_id),
    ...Array.from(reconciliationByInvoice.values()).map((r: any) => r.patient_id),
  ].filter(Boolean)));
  const { data: patientAttributionRows, error: patientAttributionError } = await (patientIds.length
    ? supabase
        .from("patient_marketing_attribution")
        .select("patient_id,validated_source,confidence,updated_at")
        .in("patient_id", patientIds)
    : Promise.resolve({ data: [], error: null }));
  if (patientAttributionError) throw patientAttributionError;

  const patientAttributionByPatient = new Map<number, any>();
  for (const row of (patientAttributionRows ?? []) as any[]) {
    const current = patientAttributionByPatient.get(row.patient_id);
    if (!current || new Date(row.updated_at ?? 0).getTime() > new Date(current.updated_at ?? 0).getTime()) {
      patientAttributionByPatient.set(row.patient_id, row);
    }
  }

  /*
   * patient_marketing_attribution is the validated patient-level CRM rollup.
   * It is intentionally preferred over raw lead_attribution rows so the dashboard
   * agrees with the validated attribution pipeline and its confidence/evidence rules.
   */
  const byKey = new Map<
    string,
    { source: string; method: string; invoiceIds: Set<number>; patientIds: Set<number>; gross: number; net: number; collected: number; doctorShare: number }
  >();

  for (const inv of validInvoices as any[]) {
    const reconciliation = reconciliationByInvoice.get(inv.invoice_no);
    // A validated reconciliation can correct the patient identity on the raw invoice.
    // Prefer that patient key; only fall back to the invoice header when no validated
    // reconciliation row exists.
    const attributionPatientId = reconciliation?.patient_id ?? inv.patient_id;
    const patientAttribution = attributionPatientId ? patientAttributionByPatient.get(attributionPatientId) : null;
    const source = patientAttribution?.validated_source ?? "unattributed";
    const method = patientAttribution
      ? reconciliation
        ? "validated_invoice_crm_patient_attribution"
        : "validated_patient_marketing_attribution"
      : "unattributed";
    const r = { source_category: source, attribution_method: method };

    const key = `${r.source_category}::${r.attribution_method}`;
    if (!byKey.has(key)) {
      byKey.set(key, { source: r.source_category, method: r.attribution_method, invoiceIds: new Set(), patientIds: new Set(), gross: 0, net: 0, collected: 0, doctorShare: 0 });
    }
    const entry = byKey.get(key)!;
    entry.invoiceIds.add(inv.invoice_id);
    if (attributionPatientId) entry.patientIds.add(attributionPatientId);
    entry.gross += Number(inv.gross_amount) || 0;
    entry.net += Number(inv.net_amount) || 0;
    entry.collected += Number(inv.collected_amount) || 0;
    entry.doctorShare += Number(inv.doctor_share_total) || 0;
  }

  return Array.from(byKey.values())
    .map((v) => {
      const invoiceCount = v.invoiceIds.size;
      return {
        source_category: v.source,
        attribution_method: v.method,
        invoice_count: invoiceCount,
        patient_count: v.patientIds.size,
        gross_revenue: v.gross,
        net_revenue: v.net,
        collected_revenue: v.collected,
        doctor_share_total: v.doctorShare,
        contribution_margin: v.net - v.doctorShare,
        avg_invoice_value: invoiceCount ? v.net / invoiceCount : null,
      };
    })
    .sort((a, b) => b.net_revenue - a.net_revenue);
}

export const getMarketingSourceSummaryFiltered = (filters: FinanceFilters) => unstable_cache(
  () => getMarketingSourceSummaryFilteredUncached(filters), ["finance-marketing", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

export async function getFacebookAttributionAudit(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let invoiceQuery = supabase.from("invoices").select("id,invoice_no,patient_id,net_bill,total_collected,total_due,invoice_status,needs_review");
  invoiceQuery = applyInvoiceFilters(invoiceQuery, filters);
  const [{ data: invoices, error: invoiceError }, { data: reconciliations, error: reconError }, { data: attribution, error: attributionError }] = await Promise.all([
    invoiceQuery,
    supabase.from("crm_invoice_reconciliation").select("id,invoice_no,patient_id,match_status,match_method,updated_at").in("match_status", ["matched", "approved_auto"]),
    supabase.from("patient_marketing_attribution").select("patient_id,validated_source,confidence").ilike("validated_source", "%facebook%"),
  ]);
  if (invoiceError) throw invoiceError;
  if (reconError) throw reconError;
  if (attributionError) throw attributionError;

  const reconByInvoice = new Map<string, any>();
  for (const row of (reconciliations ?? []) as any[]) {
    const current = reconByInvoice.get(row.invoice_no);
    if (!current || new Date(row.updated_at ?? 0).getTime() > new Date(current.updated_at ?? 0).getTime()) reconByInvoice.set(row.invoice_no, row);
  }
  const facebookPatients = new Map((attribution ?? []).map((row: any) => [row.patient_id, row]));
  const candidates = (invoices ?? []).filter((row: any) => !row.needs_review && !["cancelled", "void"].includes(row.invoice_status));
  const matched = candidates.map((invoice: any) => {
    const recon = reconByInvoice.get(invoice.invoice_no);
    const patientId = recon?.patient_id ?? invoice.patient_id;
    return { ...invoice, patientId, recon, facebook: facebookPatients.get(patientId) };
  }).filter((row: any) => row.facebook);
  const unique = <T>(values: T[]) => new Set(values.filter(Boolean)).size;
  const duplicateInvoiceRows = matched.length - unique(matched.map((row: any) => row.invoice_no));
  const patientCounts = new Map<number, number>();
  for (const row of matched) patientCounts.set(row.patientId, (patientCounts.get(row.patientId) ?? 0) + 1);
  const repeatPatients = Array.from(patientCounts.values()).filter((count) => count > 1).length;
  const rows = [
    ["Eligible invoice rows", candidates.length, "Non-cancelled/non-void and not needs_review; control population."],
    ["Facebook-attributed invoice rows", matched.length, "Invoice-level rows linked to a canonical Facebook patient."],
    ["Unique invoice numbers", unique(matched.map((row: any) => row.invoice_no)), duplicateInvoiceRows ? "Investigate duplicate invoice numbers." : "Pass: no duplicate invoice numbers."],
    ["Unique invoice records", unique(matched.map((row: any) => row.id)), "Primary key count; must equal unique invoice numbers."],
    ["Unique Facebook patients", unique(matched.map((row: any) => row.patientId)), "Deduplicated patient count; repeat visits are not new patients."],
    ["Patients with multiple Facebook invoices", repeatPatients, "Not overcounting by itself; represents repeat invoice activity."],
    ["Invoices using CRM patient correction", matched.filter((row: any) => row.recon).length, "Uses crm_invoice_reconciliation.patient_id when matched/approved."],
    ["Invoices using direct patient key", matched.filter((row: any) => !row.recon).length, "Uses invoices.patient_id when no validated CRM correction is required."],
    ["Missing resolved patient key", matched.filter((row: any) => !row.patientId).length, "Must be zero for a valid Facebook attribution."],
    ["Facebook net revenue", matched.reduce((sum: number, row: any) => sum + Number(row.net_bill || 0), 0), "Sum once per unique invoice record."],
    ["Facebook collected revenue", matched.reduce((sum: number, row: any) => sum + Number(row.total_collected || 0), 0), "Sum once per unique invoice record."],
    ["Facebook outstanding balance", matched.reduce((sum: number, row: any) => sum + Number(row.total_due || 0), 0), "Sum once per unique invoice record."],
  ];
  return rows.map(([control, result, interpretation]) => ({ control, result, interpretation }));
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

export const getDepartmentOptionsCached = unstable_cache(getDepartmentOptions, ["finance-department-options"], { revalidate: 3600 });
export const getDoctorOptionsCached = unstable_cache(getDoctorOptions, ["finance-doctor-options"], { revalidate: 3600 });

async function getReceivablesSummaryUncached(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  let query = supabase
    .from("vw_finance_invoice_summary")
    .select("invoice_id,invoice_no,invoice_date,patient_id,patient_name,department,doctor_name,net_amount,collected_amount,outstanding_amount,reconciliation_status,needs_review");
  query = applyInvoiceFilters(query, filters);
  const { data, error } = await query;
  if (error) throw error;

  const now = new Date(`${filters.dateTo}T23:59:59Z`).getTime();
  const buckets = [
    { label: "0–7 days", min: 0, max: 7, amount: 0, invoices: 0 },
    { label: "8–30 days", min: 8, max: 30, amount: 0, invoices: 0 },
    { label: "31–60 days", min: 31, max: 60, amount: 0, invoices: 0 },
    { label: "61–90 days", min: 61, max: 90, amount: 0, invoices: 0 },
    { label: "90+ days", min: 91, max: Number.POSITIVE_INFINITY, amount: 0, invoices: 0 },
  ];
  const openRows = (data ?? []).filter((r: any) => Number(r.outstanding_amount) > 0);
  for (const row of openRows as any[]) {
    const age = Math.max(0, Math.floor((now - new Date(row.invoice_date ?? filters.dateTo).getTime()) / 86400000));
    const bucket = buckets.find((b) => age >= b.min && age <= b.max) ?? buckets[buckets.length - 1];
    bucket.amount += Number(row.outstanding_amount) || 0;
    bucket.invoices += 1;
  }
  const topInvoices = [...openRows]
    .sort((a: any, b: any) => Number(b.outstanding_amount) - Number(a.outstanding_amount))
    .slice(0, 10);
  const totalNet = (data ?? []).reduce((s: number, r: any) => s + (Number(r.net_amount) || 0), 0);
  const totalCollected = (data ?? []).reduce((s: number, r: any) => s + (Number(r.collected_amount) || 0), 0);
  const totalOutstanding = openRows.reduce((s: number, r: any) => s + (Number(r.outstanding_amount) || 0), 0);
  return { buckets, topInvoices, totalNet, totalCollected, totalOutstanding, openInvoiceCount: openRows.length };
}

export const getReceivablesSummary = (filters: FinanceFilters) => unstable_cache(
  () => getReceivablesSummaryUncached(filters), ["finance-receivables", JSON.stringify(filters)], { revalidate: 86400, tags: ["finance-dashboard"] }
)();

export async function getIpdOperationalSummary() {
  const supabase = getSupabaseServerClient();
  const [{ data: admissions, error: admissionError }, { data: invoices, error: invoiceError }] = await Promise.all([
    supabase.from("admissions").select("id,an,patient_id,doctor_id,admitted_on,discharged_on,ward_name,bed_name,status,patient_type").eq("admission_type", "IPD").is("discharged_on", null),
    supabase.from("invoices").select("id,admission_id,patient_id,invoice_no,invoice_date,net_bill,total_due,total_collected,invoice_status,needs_review").not("invoice_status", "in", "(cancelled,void)").gt("total_due", 0),
  ]);
  if (admissionError) throw admissionError;
  if (invoiceError) throw invoiceError;
  const byAdmission = new Map<number, any>();
  for (const invoice of (invoices ?? []) as any[]) {
    const current = byAdmission.get(invoice.admission_id);
    if (current) {
      current.total_due = Number(current.total_due || 0) + Number(invoice.total_due || 0);
      current.total_collected = Number(current.total_collected || 0) + Number(invoice.total_collected || 0);
    } else {
      byAdmission.set(invoice.admission_id, { ...invoice });
    }
  }
  const open = (admissions ?? []).map((a: any) => ({ ...a, invoice: byAdmission.get(a.id) ?? null })).filter((a: any) => a.invoice);
  return {
    currentAdmissions: admissions ?? [],
    openBalanceAdmissions: open,
    missingInvoiceCount: (admissions ?? []).filter((a: any) => !byAdmission.has(a.id)).length,
    paidOrNoBalanceCount: Math.max(0, (admissions ?? []).length - open.length),
    totalOutstanding: open.reduce((s: number, a: any) => s + (Number(a.invoice?.total_due) || 0), 0),
  };
}

export async function getExecutiveTrustSummary(filters: FinanceFilters) {
  const supabase = getSupabaseServerClient();
  const [{ data: invoices, error: invoiceError }, { count: reconciliationIssues, error: reconciliationError }, { data: attributed, error: attributionError }] = await Promise.all([
    supabase.from("vw_finance_invoice_summary").select("invoice_id,patient_id,needs_review,doctor_id,doctor_name,net_amount,outstanding_amount").gte("invoice_date", filters.dateFrom).lte("invoice_date", filters.dateTo),
    supabase.from("vw_finance_reconciliation_issues").select("issue_type", { count: "exact", head: true }),
    supabase.from("patient_marketing_attribution").select("patient_id,confidence").not("validated_source", "is", null),
  ]);
  if (invoiceError) throw invoiceError;
  if (reconciliationError) throw reconciliationError;
  if (attributionError) throw attributionError;
  const rows = invoices ?? [];
  const reviewCount = rows.filter((r: any) => r.needs_review).length;
  const missingDoctorCount = rows.filter((r: any) => !r.doctor_id && !r.doctor_name).length;
  const attributedPatientIds = new Set((attributed ?? []).map((r: any) => r.patient_id));
  const patientCount = new Set(rows.map((r: any) => r.patient_id).filter(Boolean)).size;
  const attributedInvoiceCount = rows.filter((r: any) => attributedPatientIds.has((r as any).patient_id)).length;
  return {
    invoiceCount: rows.length,
    reviewCount,
    missingDoctorCount,
    reconciliationIssues: reconciliationIssues ?? 0,
    attributedInvoiceCount,
    attributionCoverage: rows.length ? (attributedInvoiceCount / rows.length) * 100 : 0,
    patientCount,
    sourceRefreshedAt: new Date().toISOString(),
  };
}
