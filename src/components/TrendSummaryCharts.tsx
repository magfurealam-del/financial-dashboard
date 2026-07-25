"use client";

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TrendSummaryCharts({ data }: { data: Record<string, unknown>[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Revenue versus cash collected</h3>
        <p className="mt-1 text-xs text-slate-500">The gap between these bars is the period’s collection opportunity.</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={54} /><Tooltip formatter={(value) => Number(value).toLocaleString("en-BD", { maximumFractionDigits: 0 })} /><Legend wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="Net Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} /><Bar dataKey="Collected Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Collection rate and margin quality</h3>
        <p className="mt-1 text-xs text-slate-500">Both measures are percentages, so they can be compared directly.</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} /><YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={42} /><Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} /><Legend wrapperStyle={{ fontSize: 11 }} /><Line type="monotone" dataKey="Collection Rate" stroke="#059669" strokeWidth={2.5} dot={false} /><Line type="monotone" dataKey="Contribution Margin %" stroke="#9333ea" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
