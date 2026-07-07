import { NextResponse } from "next/server";
import { getReconciliationIssues } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const rows = await getReconciliationIssues();
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="reconciliation_issues.csv"`,
    },
  });
}
