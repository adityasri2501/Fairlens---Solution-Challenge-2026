"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";

export default function BiasReportsPage() {
  return (
    <RoleGuard allowedRoles={["COMPLIANCE_OFFICER"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Bias Reports</h1>
        <p className="text-slate-600">Export regulatory-ready PDF reports on your AI systems' fairness.</p>
        
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-8 text-center text-slate-500">
          <p>The Reports Dashboard is currently under construction. Check back soon!</p>
        </div>
      </div>
    </RoleGuard>
  );
}
