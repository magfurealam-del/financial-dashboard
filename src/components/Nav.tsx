"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "Executive Summary" },
  { href: "/trends", label: "Daily / Weekly / Monthly" },
  { href: "/invoices", label: "Invoices" },
  { href: "/departments", label: "Departments" },
  { href: "/doctors", label: "Doctor Shares" },
  { href: "/patients", label: "Patients" },
  { href: "/reconciliation", label: "Data Quality" },
];

export function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  return (
    <nav className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-900 px-4 py-2">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={qs ? `${link.href}?${qs}` : link.href}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white",
            pathname === link.href && "bg-slate-800 text-white"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
