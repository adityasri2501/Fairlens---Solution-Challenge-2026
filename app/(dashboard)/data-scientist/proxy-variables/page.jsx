"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Link as LinkIcon, AlertCircle } from "lucide-react";

export default function ProxyVariablesPage() {
  const [datasetId, setDatasetId] = useState("loan_data_v1");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/bias/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datasetId })
      });
      const data = await res.json();
      setResults(data.proxies);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["DATA_SCIENTIST"]}>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        <h1 className="text-3xl font-bold tracking-tight">Detect Proxy Variables</h1>
        <p className="text-slate-600">Analyze your dataset to uncover hidden correlations and variables that act as proxies for protected attributes (e.g. zip code acting as a proxy for race).</p>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-8">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Dataset / Model to Analyze</label>
              <select 
                className="w-full p-2.5 border rounded-md bg-slate-50"
                value={datasetId}
                onChange={(e) => setDatasetId(e.target.value)}
              >
                <option value="loan_data_v1">Loan Approval Dataset (Historical)</option>
                <option value="hiring_data_q1">Hiring Algorithm Data (Q1)</option>
              </select>
            </div>
            <Button 
              className="h-11 px-8 text-md bg-indigo-600 hover:bg-indigo-700"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : <><Search className="w-5 h-5 mr-2" /> Run Analysis</>}
            </Button>
          </div>
        </div>

        {results && (
          <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-2" /> Proxy Variables Detected
              </h3>
              <span className="text-sm text-slate-500">{results.length} high-risk correlations found</span>
            </div>
            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500 bg-white">
                    <th className="p-4 font-medium">Feature</th>
                    <th className="p-4 font-medium">Correlation Score (Pearson)</th>
                    <th className="p-4 font-medium">Linked Protected Class</th>
                    <th className="p-4 font-medium">Action Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">{item.feature}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden mr-3">
                            <div className={`h-full ${item.correlation > 0.6 ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: `${item.correlation * 100}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{item.correlation.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 flex items-center">
                        <LinkIcon className="w-4 h-4 mr-2 text-slate-400" />
                        {item.feature === 'zip_code' ? 'Race / Ethnicity' : 'Gender / Age'}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.recommendation === 'remove' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                          {item.recommendation.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
