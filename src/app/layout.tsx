import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { FilterBarContainer } from "@/components/FilterBarContainer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ekagra Health Finance Dashboard",
  description: "Financial performance dashboard for Ekagra Hospital / Ekagra Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f6f8fb] text-[#172033]">
        <header className="flex flex-col">
          <div className="flex items-center justify-between bg-[#101a33] px-5 py-3 text-white">
            <span className="text-sm font-semibold text-white">Ekagra Health · Finance Dashboard</span>
          </div>
          <Suspense>
            <Nav />
          </Suspense>
          <Suspense>
            <FilterBarContainer />
          </Suspense>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </body>
    </html>
  );
}
