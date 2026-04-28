"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";

export default function FairnessTradeoffPage() {
  return (
    <RoleGuard allowedRoles={["PRODUCT_MANAGER"]}>
      <div className="space-y-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Fairness-Accuracy Tradeoff</h1>
        <p className="text-slate-600">Determine the optimal balance between model accuracy and ethical fairness.</p>
        
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-8 text-center text-slate-500">
          <p>The Tradeoff Analysis tool is currently under construction. Check back soon!</p>
        </div>
      </div>
    </RoleGuard>
  );
}
