export const METRIC_CONTRACT = {
  netRevenue: "Validated, non-cancelled/non-void invoice net amount; needs_review records remain visible as exceptions.",
  collectedRevenue: "Validated collections recorded against those invoices.",
  outstandingReceivables: "Positive net amount less collections, shown at invoice level.",
  contributionMargin: "Net revenue less doctor share; direct costs remain separately identified where available.",
  marketingAttribution: "Validated patient_marketing_attribution, with crm_invoice_reconciliation patient correction taking precedence.",
  openIpdFinancialExposure: "Active IPD admissions with at least one non-cancelled/non-void invoice and positive total_due.",
} as const;
