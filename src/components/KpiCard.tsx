import Link from "next/link";
import { cn } from "@/lib/cn";

interface KpiCardProps {
  label: string;
  value: string;
  changePct?: number | null;
  href?: string;
  tone?: "default" | "warning" | "danger";
}

export function KpiCard({ label, value, changePct, href, tone = "default" }: KpiCardProps) {
  const content = (
    <div
      className={cn(
        "group flex flex-col gap-2 rounded-2xl border bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(15,23,42,.09)]",
        tone === "warning" && "border-amber-300",
        tone === "danger" && "border-red-300",
        tone === "default" && "border-slate-200/80"
      )}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">{label}</span>
      <span className="text-2xl font-semibold tracking-tight text-slate-900">{value}</span>
      {changePct !== undefined && changePct !== null && (
        <span
          className={cn(
            "text-xs font-medium",
            changePct > 0 ? "text-emerald-600" : changePct < 0 ? "text-red-600" : "text-slate-400"
          )}
        >
          {changePct > 0 ? "▲" : changePct < 0 ? "▼" : "–"} {Math.abs(changePct).toFixed(1)}% vs prior period
        </span>
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
