import { NextResponse } from "next/server";
import { getMarketingSourceSummary } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const rows = await getMarketingSourceSummary();
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="marketing_source_revenue.csv"`,
    },
  });
}
