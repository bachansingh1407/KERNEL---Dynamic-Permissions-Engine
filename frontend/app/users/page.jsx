import PermissionGuard from "../components/auth/PermissionGuard";
import { PERMISSIONS } from "../core/permissions/constants";

export default function UsersPage() {
  return (
     <PermissionGuard
          permission={PERMISSIONS.CAN_EDIT_ROLES}
          fallback={<div className="p-20 text-center text-slate-500">Unauthorized: Restricted to System Administrators.</div>}
        >
      <div className="w-full">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-500 text-sm">Manage kernel access for all 400+ users.</p>
        </header>

        {/* User Table Component would go here */}
        <div className="bg-white border border-slate-200 rounded-xl h-96 flex items-center justify-center text-slate-400">
          User List Read Model (Query)
        </div>
      </div>
</PermissionGuard>
  );
}