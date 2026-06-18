"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">

      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 text-white font-semibold">

        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
        >
          🎮 Dashboard
        </Link>

        <Link
          href="/projects"
          className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
        >
          🚀 Projects
        </Link>

        <Link
          href="/tasks"
          className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
        >
          ✅ Tasks
        </Link>

        <Link
          href="/audit-logs"
          className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
        >
          📜 Audit Logs
        </Link>

        <a
          href="/api/auth/logout"
          className="ml-auto px-4 py-2 rounded-xl hover:bg-red-500/20 transition"
        >
          🚪 Logout
        </a>

      </div>
    </nav>
  );
}