"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface FilterBarProps {
  departments: string[];
  doctors: { id: number; name: string }[];
  patientTypes: string[];
  paymentStatuses: string[];
}

export function FilterBar({ departments, doctors, patientTypes, paymentStatuses }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [from, setFrom] = useState(searchParams.get("from") ?? "");
  const [to, setTo] = useState(searchParams.get("to") ?? "");

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            updateParam("from", e.target.value);
          }}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            updateParam("to", e.target.value);
          }}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm"
        />
      </div>

      <select
        defaultValue={searchParams.get("department") ?? ""}
        onChange={(e) => updateParam("department", e.target.value)}
        className="rounded-md border border-slate-300 px-2 py-1 text-sm"
      >
        <option value="">All departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("doctorId") ?? ""}
        onChange={(e) => updateParam("doctorId", e.target.value)}
        className="rounded-md border border-slate-300 px-2 py-1 text-sm"
      >
        <option value="">All doctors</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("patientType") ?? ""}
        onChange={(e) => updateParam("patientType", e.target.value)}
        className="rounded-md border border-slate-300 px-2 py-1 text-sm"
      >
        <option value="">All patient types</option>
        {patientTypes.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("paymentStatus") ?? ""}
        onChange={(e) => updateParam("paymentStatus", e.target.value)}
        className="rounded-md border border-slate-300 px-2 py-1 text-sm"
      >
        <option value="">All payment statuses</option>
        {paymentStatuses.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {isPending && <span className="text-xs text-slate-400">Updating…</span>}
    </div>
  );
}
