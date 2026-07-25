"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function RefreshTableButton({ label = "Update Table" }: { label?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [justUpdated, setJustUpdated] = useState(false);

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await fetch("/api/refresh", { method: "POST" });
          router.refresh();
        });
        setJustUpdated(true);
        setTimeout(() => setJustUpdated(false), 1500);
      }}
      disabled={isPending}
      className="rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {isPending ? "Updating…" : justUpdated ? "Updated ✓" : label}
    </button>
  );
}
