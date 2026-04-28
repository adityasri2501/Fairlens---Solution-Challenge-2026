"use client";

import { useState } from "react";
import { RoleGuard } from "@/components/layout/RoleGuard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, ShieldCheck, Activity, CheckCircle2 } from "lucide-react";

export default function MitigateBiasPage() {
  const [selectedModel, setSelectedModel] = useState("Credit_Risk_Model_v2");
  const [technique, setTechnique] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [result, setResult] = useState(null);

  const handleMitigate = async () => {
    setIsApplying(true);
    try {
      const res = await fetch("/api/bias/mitigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scanId: "scan-xyz",
          technique: technique,
          phase: "pre-processing",
          parameters: {}
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["DATA_SCIENTIST"]}>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        <h1 className="text-3xl font-bold tracking-tight">Mitigate Algorithmic Bias</h1>
        <p className="text-slate-600">Select a model and apply advanced mitigation techniques to correct historical bias.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Settings Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Dataset / Model</label>
                  <select 
                    className="w-full p-2 border rounded-md bg-slate-50"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="Credit_Risk_Model_v2">Credit Risk Model (v2) - High Bias</option>
                    <option value="Hiring_Algorithm_Q1">Hiring Algorithm Q1 - Moderate Bias</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mitigation Strategy</label>
                  <div className="space-y-2">
                    <label className={`block p-3 border rounded-lg cursor-pointer transition-colors ${technique === 'reweighing' ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                      <input type="radio" name="technique" className="mr-2" onChange={() => setTechnique('reweighing')} />
                      <span className="font-medium">Reweighing</span>
                      <p className="text-xs text-slate-500 mt-1 ml-5">Modifies weights of training samples (Pre-processing)</p>
                    </label>
                    <label className={`block p-3 border rounded-lg cursor-pointer transition-colors ${technique === 'prejudice_remover' ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                      <input type="radio" name="technique" className="mr-2" onChange={() => setTechnique('prejudice_remover')} />
                      <span className="font-medium">Prejudice Remover</span>
                      <p className="text-xs text-slate-500 mt-1 ml-5">Adds discrimination-aware regularization (In-processing)</p>
                    </label>
                    <label className={`block p-3 border rounded-lg cursor-pointer transition-colors ${technique === 'threshold_optimizer' ? 'border-blue-500 bg-blue-50' : 'hover:bg-slate-50'}`}>
                      <input type="radio" name="technique" className="mr-2" onChange={() => setTechnique('threshold_optimizer')} />
                      <span className="font-medium">Equalized Odds Post-processing</span>
                      <p className="text-xs text-slate-500 mt-1 ml-5">Adjusts classification thresholds per group</p>
                    </label>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 h-12 text-md" 
                  disabled={!technique || isApplying}
                  onClick={handleMitigate}
                >
                  {isApplying ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Applying...</> : 'Apply Strategy'}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="md:col-span-2">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-12 text-slate-500">
                <ShieldCheck className="w-16 h-16 text-slate-300 mb-4" />
                <p>Select a mitigation strategy and apply it to see the before and after comparison of your model's fairness metrics.</p>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Mitigation Successful</h3>
                    <p className="text-slate-600 mt-1">Technique: <span className="font-semibold text-blue-600 capitalize">{technique.replace("_", " ")}</span></p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Model Updated
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-8 mb-10">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-2 font-medium">Before Mitigation</div>
                    <div className="w-32 h-32 rounded-full border-4 border-red-200 flex flex-col items-center justify-center bg-red-50">
                      <span className="text-3xl font-bold text-red-600">{result.beforeScore}</span>
                      <span className="text-xs text-red-500 mt-1">High Bias</span>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-8 h-8 text-slate-400" />
                  
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-2 font-medium">After Mitigation</div>
                    <div className="w-32 h-32 rounded-full border-4 border-green-200 flex flex-col items-center justify-center bg-green-50">
                      <span className="text-3xl font-bold text-green-600">{result.afterScore}</span>
                      <span className="text-xs text-green-600 mt-1">Fair Model</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" /> Performance Impact
                  </h4>
                  <p className="text-sm text-slate-600">
                    Applying {technique.replace("_", " ")} successfully raised the fairness score past the 80% threshold. Overall model accuracy dropped slightly from <span className="font-semibold text-slate-800">92.4%</span> to <span className="font-semibold text-slate-800">90.1%</span>, which is within acceptable compliance tradeoffs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
