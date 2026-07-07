"use client";

import { useMemo, useState } from "react";
import { TrendChart } from "@/components/TrendChart";
import { cn } from "@/lib/cn";

interface CensusRow {
  census_date: string;
  patients_in_ipd: number;
}

export function IpdCensusChart({ data }: { data: CensusRow[] }) {
  const [granularity, setGranularity] = useState<"daily" | "monthly">("daily");

  const chartData = useMemo(() => {
    if (granularity === "daily") {
      return data.map((r) => ({
        label: new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Dhaka" }).format(new Date(r.census_date)),
        "Patients in IPD": Number(r.patients_in_ipd),
      }));
    }
    const byMonth = new Map<string, { sum: number; count: number; max: number }>();
    for (const r of data) {
      const monthKey = r.census_date.slice(0, 7);
      const entry = byMonth.get(monthKey) ?? { sum: 0, count: 0, max: 0 };
      entry.sum += Number(r.patients_in_ipd);
      entry.count += 1;
      entry.max = Math.max(entry.max, Number(r.patients_in_ipd));
      byMonth.set(monthKey, entry);
    }
    return Array.from(byMonth.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({
        label: month,
        "Avg Patients in IPD": Math.round((v.sum / v.count) * 10) / 10,
        "Peak Patients in IPD": v.max,
      }));
  }, [data, granularity]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">IPD Occupancy Over Time</h2>
        <div className="flex gap-1 rounded-md border border-slate-300 bg-white p-1">
          {(["daily", "monthly"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGranularity(g)}
              className={cn(
                "rounded px-3 py-1 text-sm capitalize",
                granularity === g ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <TrendChart
        data={chartData}
        xKey="label"
        lines={
          granularity === "daily"
            ? [{ key: "Patients in IPD", label: "Patients in IPD", color: "#2563eb" }]
            : [
                { key: "Avg Patients in IPD", label: "Avg Patients in IPD", color: "#2563eb" },
                { key: "Peak Patients in IPD", label: "Peak Patients in IPD", color: "#ea580c" },
              ]
        }
      />
    </div>
  );
}
