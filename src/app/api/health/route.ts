import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const started = Date.now();
  const { error } = await getSupabaseServerClient().from("invoices").select("id", { count: "exact", head: true });
  const latencyMs = Date.now() - started;
  return NextResponse.json({ ok: !error, latencyMs, checkedAt: new Date().toISOString(), error: error?.message ?? null }, { status: error ? 503 : 200 });
}
