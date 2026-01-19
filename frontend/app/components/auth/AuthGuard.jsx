"use client";

import { useAuthStore } from "@/app/core/store/useAuthStore";
import Login from "@/app/login/page";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}
