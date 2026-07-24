"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { BarChart3, ClipboardList, Database, FileCheck2, HeartPulse, LayoutDashboard, Megaphone, Stethoscope, Users, WalletCards } from "lucide-react";

const LINKS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/trends", label: "Trends", icon: BarChart3 },
  { href: "/invoices", label: "Invoices", icon: ClipboardList },
  { href: "/departments", label: "Departments", icon: Database },
  { href: "/doctors", label: "Doctor Shares", icon: Stethoscope },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/admissions", label: "Admissions", icon: HeartPulse },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/reconciliation", label: "Data Quality", icon: FileCheck2 },
  { href: "/validation", label: "Validation", icon: WalletCards },
];

export function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2.5">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={qs ? `${link.href}?${qs}` : link.href}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900",
            pathname === link.href && "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100"
          )}
        >
          <link.icon className="h-3.5 w-3.5" />{link.label}
        </Link>
      ))}
    </nav>
  );
}
