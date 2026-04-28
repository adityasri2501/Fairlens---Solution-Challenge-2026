"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";
import { DatasetUploadZone } from "@/components/upload/DatasetUploadZone";

export default function UploadPage() {
  return (
    <RoleGuard allowedRoles={["DATA_SCIENTIST"]}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Upload Models & Data</h1>
        <p className="text-slate-600">Upload your datasets and trained models to begin scanning for bias.</p>
        
        <div className="space-y-8 mt-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Dataset Upload</h2>
            <DatasetUploadZone />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
