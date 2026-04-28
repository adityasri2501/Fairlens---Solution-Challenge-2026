"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";

export default function ReviewerDashboard() {
  return (
    <RoleGuard allowedRoles={["REVIEWER"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Human Review Queue</h1>
        <p className="text-slate-600">Review flagged cases and override algorithmic decisions.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg">Pending Cases</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">14</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
