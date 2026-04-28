"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";

export default function ProductManagerDashboard() {
  return (
    <RoleGuard allowedRoles={["PRODUCT_MANAGER"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Product Manager Dashboard</h1>
        <p className="text-slate-600">Monitor fairness health scores and demographic parity.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg">Overall Fairness Score</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0.86</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
