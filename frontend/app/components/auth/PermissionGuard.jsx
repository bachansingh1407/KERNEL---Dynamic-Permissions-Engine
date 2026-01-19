// src/components/auth/PermissionGuard.tsx
"use client";
import { useAuthStore } from "@/app/core/store/useAuthStore";

export default function PermissionGuard({ permission, children, fallback }) {
  const { user } = useAuthStore();
  
  // Senior Logic: Admin always passes, others check permission array
  const hasPermission = user?.role === 'Admin' || user?.permissions?.includes(permission);

  if (!hasPermission) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}