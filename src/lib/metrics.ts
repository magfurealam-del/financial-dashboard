/**
 * Reusable financial metric calculations.
 * Base aggregates (gross/net/collected/doctor share/etc.) are computed in
 * the vw_finance_* Supabase views. This module derives ratio metrics from
 * those aggregates so the definitions live in exactly one place.
 */

export interface FinanceAggregate {
  grossRevenue: number;
  discountTotal: number;
  refundTotal: number;
  netRevenue: number;
  collectedRevenue: number;
  outstandingRevenue: number;
  doctorShareTotal: number;
  directCostTotal?: number;
  invoiceCount: number;
  patientCount: number;
}

export function contributionMargin(netRevenue: number, doctorShareTotal: number): number {
  return netRevenue - doctorShareTotal;
}

export function contributionMarginPct(netRevenue: number, doctorShareTotal: number): number | null {
  if (!netRevenue) return null;
  return (contributionMargin(netRevenue, doctorShareTotal) / netRevenue) * 100;
}

export function adjustedContributionMargin(
  netRevenue: number,
  doctorShareTotal: number,
  directCostTotal: number
): number {
  return netRevenue - doctorShareTotal - directCostTotal;
}

export function collectionRate(collectedRevenue: number, netRevenue: number): number | null {
  if (!netRevenue) return null;
  return (collectedRevenue / netRevenue) * 100;
}

export function discountRate(discountTotal: number, grossRevenue: number): number | null {
  if (!grossRevenue) return null;
  return (discountTotal / grossRevenue) * 100;
}

export function refundRate(refundTotal: number, grossRevenue: number): number | null {
  if (!grossRevenue) return null;
  return (refundTotal / grossRevenue) * 100;
}

export function avgInvoiceValue(netRevenue: number, invoiceCount: number): number | null {
  if (!invoiceCount) return null;
  return netRevenue / invoiceCount;
}

export function avgRevenuePerPatient(netRevenue: number, patientCount: number): number | null {
  if (!patientCount) return null;
  return netRevenue / patientCount;
}

/** Percentage change from previous to current, or null if previous is 0/undefined. */
export function periodOverPeriodChange(current: number, previous: number | null | undefined): number | null {
  if (!previous) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}
