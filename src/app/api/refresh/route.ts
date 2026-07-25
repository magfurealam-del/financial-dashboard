import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const paths = ["/", "/trends", "/invoices", "/receivables", "/departments", "/doctors", "/patients", "/admissions", "/marketing", "/reconciliation", "/validation"];

export async function POST() {
  revalidateTag("finance-dashboard", "max");
  for (const path of paths) revalidatePath(path);
  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString(), paths });
}

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return POST();
}
