import { NextRequest, NextResponse } from "next/server";
import { getAdmissionSummary } from "@/lib/queries/finance";
import { parseFiltersFromSearchParams } from "@/lib/filters";
import { toCsv } from "@/lib/csv";

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const filters = parseFiltersFromSearchParams(searchParams);
  const admissionType = searchParams.type ?? undefined;
  const { rows } = await getAdmissionSummary({ page: 0, pageSize: 100000, admissionType, filters });
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="admissions_${filters.dateFrom}_to_${filters.dateTo}.csv"`,
    },
  });
}
