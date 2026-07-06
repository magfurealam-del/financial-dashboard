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
        "flex flex-col gap-1 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md",
        tone === "warning" && "border-amber-300",
        tone === "danger" && "border-red-300",
        tone === "default" && "border-slate-200"
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-xl font-semibold text-slate-900">{value}</span>
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
