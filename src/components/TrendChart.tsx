"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine } from "recharts";

interface TrendChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { key: string; label: string; color: string }[];
  averageLines?: { key: string; label: string; color: string }[];
}

export function TrendChart({ data, xKey, lines, averageLines = [] }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 12, right: 16, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e8edf5" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={58} />
        <Tooltip contentStyle={{ borderRadius: 14, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,.1)" }} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        {lines.map((line) => (
          <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
        ))}
        {averageLines.map((line) => {
          const values = data.map((row) => Number(row[line.key]) || 0);
          const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
          return <ReferenceLine key={line.key} y={average} stroke={line.color} strokeDasharray="6 5" strokeWidth={2} label={{ value: `${line.label}: ${Math.round(average).toLocaleString("en-BD")}`, position: "insideTopRight", fill: line.color, fontSize: 11 }} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
