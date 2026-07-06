import { monthStartBD, todayBD } from "@/lib/format";

export interface FinanceFilters {
  dateFrom: string;
  dateTo: string;
  department?: string;
  doctorId?: number;
  patientType?: string;
  paymentStatus?: string;
}

/** Default view: current month-to-date, Asia/Dhaka. */
export function defaultFilters(): FinanceFilters {
  return {
    dateFrom: monthStartBD(),
    dateTo: todayBD(),
  };
}

export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): FinanceFilters {
  const defaults = defaultFilters();
  const get = (key: string) => {
    const v = searchParams[key];
    return Array.isArray(v) ? v[0] : v;
  };

  return {
    dateFrom: get("from") || defaults.dateFrom,
    dateTo: get("to") || defaults.dateTo,
    department: get("department") || undefined,
    doctorId: get("doctorId") ? Number(get("doctorId")) : undefined,
    patientType: get("patientType") || undefined,
    paymentStatus: get("paymentStatus") || undefined,
  };
}

/** Returns the immediately preceding period of equal length, for period-over-period comparison. */
export function previousPeriod(filters: FinanceFilters): { dateFrom: string; dateTo: string } {
  const from = new Date(filters.dateFrom);
  const to = new Date(filters.dateTo);
  const spanMs = to.getTime() - from.getTime();
  const prevTo = new Date(from.getTime() - 24 * 60 * 60 * 1000);
  const prevFrom = new Date(prevTo.getTime() - spanMs);
  return {
    dateFrom: prevFrom.toISOString().slice(0, 10),
    dateTo: prevTo.toISOString().slice(0, 10),
  };
}
