import { NextRequest, NextResponse } from "next/server";
import { getPatientSummary } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q") ?? undefined;
  const { rows } = await getPatientSummary({ page: 0, pageSize: 100000, search });
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="patients.csv"`,
    },
  });
}
