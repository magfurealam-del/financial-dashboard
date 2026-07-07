import { NextRequest, NextResponse } from "next/server";
import { getAdmissionSummary } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET(request: NextRequest) {
  const admissionType = request.nextUrl.searchParams.get("type") ?? undefined;
  const { rows } = await getAdmissionSummary({ page: 0, pageSize: 100000, admissionType });
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="admissions.csv"`,
    },
  });
}
