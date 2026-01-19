// src/app/(dashboard)/layout.tsx
import AuthGuard from "../auth/AuthGuard";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
    
        <div className="flex flex-1 flex-col overflow-hidden h-screen">
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto py-6 bg-slate-50">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
    </AuthGuard>
  );
}