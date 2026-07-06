const TIMEZONE = "Asia/Dhaka";

const bdtFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  currencyDisplay: "symbol",
  maximumFractionDigits: 0,
});

const bdtFormatterDecimal = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  currencyDisplay: "symbol",
  maximumFractionDigits: 2,
});

export function formatBDT(amount: number | null | undefined, decimals = false): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "—";
  return decimals ? bdtFormatterDecimal.format(amount) : bdtFormatter.format(amount);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-BD").format(value);
}

export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${value.toFixed(decimals)}%`;
}

export function formatDateBD(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatDateTimeBD(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/** Returns the current date as YYYY-MM-DD in Asia/Dhaka. */
export function todayBD(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(new Date());
}

/** First day of the current month in Asia/Dhaka, as YYYY-MM-DD. */
export function monthStartBD(): string {
  const today = todayBD();
  return `${today.slice(0, 7)}-01`;
}

export { TIMEZONE };
