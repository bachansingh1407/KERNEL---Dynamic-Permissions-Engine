// src/app/(dashboard)/roles/page.tsx
import PermissionGuard from "../components/auth/PermissionGuard";
import { PERMISSIONS } from "../core/permissions/constants";

export default function RolesPage() {
  return (
    <PermissionGuard
      permission={PERMISSIONS.CAN_EDIT_ROLES}
      fallback={<div className="p-20 text-center text-slate-500">Unauthorized: Restricted to System Administrators.</div>}
    >
      <div className="w-full">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Access Control</h1>
          <p className="text-slate-500 text-sm">Define and assign dynamic roles to the system.</p>
        </header>

        {/* Role Matrix would go here */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
           <h3 className="font-bold text-sky-700 mb-4">Permissions Matrix</h3>
           {/* This is where your Commands will be triggered */}
           <p className="text-xs text-slate-400 italic font-mono">CORE_ENGINE_READY</p>
        </div>
      </div>
    </PermissionGuard>
  );
}