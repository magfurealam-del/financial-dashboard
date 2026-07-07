import { NextResponse } from "next/server";
import { getValidationChecks } from "@/lib/queries/finance";
import { toCsv } from "@/lib/csv";

export async function GET() {
  const rows = await getValidationChecks();
  const csv = toCsv(rows as unknown as Record<string, unknown>[]);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="validation_checks.csv"`,
    },
  });
}
