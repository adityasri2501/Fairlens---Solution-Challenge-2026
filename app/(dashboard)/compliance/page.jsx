"use client";

import { RoleGuard } from "@/components/layout/RoleGuard";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, AlertTriangle, ShieldAlert, Download } from "lucide-react";

export default function ComplianceDashboard() {
  const reports = [
    { id: "REP-104", model: "Credit Risk Model v2", status: "Review Required", date: "2026-04-28", risk: "High" },
    { id: "REP-103", model: "Hiring Algorithm Q1", status: "Compliant", date: "2026-04-25", risk: "Low" },
    { id: "REP-102", model: "Marketing Churn Predictor", status: "Compliant", date: "2026-04-18", risk: "Low" },
    { id: "REP-101", model: "Loan Approval v1", status: "Mitigated", date: "2026-04-10", risk: "Medium" }
  ];

  return (
    <RoleGuard allowedRoles={["COMPLIANCE_OFFICER"]}>
      <div className="space-y-8 max-w-6xl mx-auto pb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Compliance & Audit Hub</h1>
          <p className="text-slate-600 mt-2">Monitor model fairness compliance, review bias incident reports, and download audit trails for regulatory submission.</p>
        </div>
        
        {/* Top KPI Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="text-sm font-medium text-slate-500">Total Monitored Models</div>
            <div className="text-3xl font-bold text-slate-900 mt-2">12</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="text-sm font-medium text-slate-500">Fully Compliant</div>
            <div className="text-3xl font-bold text-green-600 mt-2 flex items-center">
              11 <CheckCircle className="w-5 h-5 ml-2" />
            </div>
          </div>
          <div className="p-6 bg-red-50 rounded-xl shadow-sm border border-red-200 flex flex-col justify-between">
            <div className="text-sm font-medium text-red-600">Pending Reviews</div>
            <div className="text-3xl font-bold text-red-700 mt-2 flex items-center">
              1 <ShieldAlert className="w-6 h-6 ml-2" />
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="text-sm font-medium text-slate-500">Audit Reports Generated</div>
            <div className="text-3xl font-bold text-blue-600 mt-2 flex items-center">
              24 <FileText className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-slate-800">Recent Bias Audit Reports</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="p-4 font-medium">Report ID</th>
                  <th className="p-4 font-medium">Model Name</th>
                  <th className="p-4 font-medium">Date Generated</th>
                  <th className="p-4 font-medium">Risk Level</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{report.id}</td>
                    <td className="p-4 text-slate-600">{report.model}</td>
                    <td className="p-4 text-slate-500">{report.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        report.risk === 'High' ? 'bg-red-100 text-red-700' : 
                        report.risk === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {report.risk}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-sm">
                        {report.status === 'Review Required' ? (
                          <span className="text-red-600 flex items-center"><AlertTriangle className="w-4 h-4 mr-1" /> {report.status}</span>
                        ) : report.status === 'Mitigated' ? (
                          <span className="text-blue-600 flex items-center"><ShieldAlert className="w-4 h-4 mr-1" /> {report.status}</span>
                        ) : (
                          <span className="text-green-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> {report.status}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600">Review</Button>
                      <Button variant="outline" size="sm" onClick={() => window.print()}>
                        <Download className="w-4 h-4 mr-2" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
