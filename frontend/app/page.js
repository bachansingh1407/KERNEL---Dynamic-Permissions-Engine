"use client"
import { useAuthStore } from "./core/store/useAuthStore";

export default function Home() {
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h2 className="text-2xl font-semibold text-slate-800">Bachan Singh</h2>
      <button
        onClick={logout}
        className="px-6 py-2 rounded-md bg-rose-600 text-white font-semibold
                   hover:bg-rose-700 transition shadow-sm"
      >
        Logout
      </button>
    </div>
  );
}
