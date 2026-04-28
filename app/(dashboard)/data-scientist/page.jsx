"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";

export default function DataScientistDashboard() {
  return (
    <RoleGuard allowedRoles={["DATA_SCIENTIST"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Scientist Dashboard</h1>
        <p className="text-slate-600">Overview of your recent model scans and bias detection tasks.</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg">Recent Scans</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg">Active Mitigations</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">4</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-lg">Pending Escalations</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">7</p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
