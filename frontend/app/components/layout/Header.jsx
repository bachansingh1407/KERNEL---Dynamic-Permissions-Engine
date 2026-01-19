"use client";

import { useAuthStore } from "@/app/core/store/useAuthStore";

export default function Header() {
  const { user, isHydrated } = useAuthStore();

  if (!isHydrated) return null; // 🔥 prevents guest flash

  const initial = user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
        <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
          Kernel System
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-50 border-4 border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
          {initial}
        </div>

        <div className="text-left">
          <p className="text-sm font-bold text-slate-600 tracking-wide">
            {user?.email}
          </p>

          <p
            className={`text-[10px] font-semibold uppercase tracking-[2px] ${
              user?.role === "SUPER_ADMIN"
                ? "text-rose-600"
                : "text-sky-600"
            }`}
          >
            {user?.role}
          </p>
        </div>
      </div>
    </header>
  );
}
