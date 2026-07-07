import { NextResponse } from "next/server";
import { getDepartmentSummary } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const rows = await getDepartmentSummary();
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="departments.csv"`,
    },
  });
}
