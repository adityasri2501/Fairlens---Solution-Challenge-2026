"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Papa from 'papaparse';

export function DatasetUploadZone() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [targetCol, setTargetCol] = useState("");
  const [sensitiveCols, setSensitiveCols] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Parse CSV to get columns
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.meta.fields) {
            setColumns(results.meta.fields);
            setRows(results.data);
            if (results.meta.fields.includes("income")) setTargetCol("income");
            if (results.meta.fields.includes("loan_approved")) setTargetCol("loan_approved");
            if (results.meta.fields.includes("race")) setSensitiveCols(["race"]);
          }
        }
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxSize: 524288000,
    multiple: false
  });

  const toggleSensitiveCol = (col) => {
    if (sensitiveCols.includes(col)) {
      setSensitiveCols(sensitiveCols.filter(c => c !== col));
    } else {
      setSensitiveCols([...sensitiveCols, col]);
    }
  };

  const handleScan = async () => {
    setScanning(true);
    
    try {
      // Simulate calling the Next.js API route
      const res = await fetch('/api/bias/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetId: file.name,
          targetColumn: targetCol,
          sensitiveFeatures: sensitiveCols,
          data_rows: rows.slice(0, 500) // Send max 500 rows to avoid payload too large for MVP
        })
      });

      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      
      setScanResult({
        disparateImpact: data.results.metrics.disparateImpact,
        equalOpportunityDiff: data.results.metrics.equalOpportunityDiff,
        status: data.results.metrics.status,
        recommendation: data.results.metrics.recommendation
      });
    } catch (e) {
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-slate-700">Drag & drop your dataset here (.csv)</p>
          <Button variant="secondary" className="mt-6 pointer-events-none">Select File</Button>
        </div>
      ) : (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex items-center space-x-4 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">{file.name}</h3>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for Analysis</p>
            </div>
          </div>

          {!scanResult && (
            <div className="space-y-6 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Prediction Column</label>
                <select 
                  className="w-full p-2 border rounded-md bg-slate-50"
                  value={targetCol}
                  onChange={(e) => setTargetCol(e.target.value)}
                >
                  <option value="">Select a column...</option>
                  {columns.map(col => <option key={col} value={col}>{col}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sensitive Features (e.g., Race, Gender, Age)</label>
                <div className="flex flex-wrap gap-2">
                  {columns.map(col => (
                    <button
                      key={col}
                      onClick={() => toggleSensitiveCol(col)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        sensitiveCols.includes(col) 
                          ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full text-lg h-12 mt-4" 
                onClick={handleScan}
                disabled={!targetCol || sensitiveCols.length === 0 || scanning}
              >
                {scanning ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Scanning for Bias...</> : 'Initiate Fairness Scan'}
              </Button>
            </div>
          )}

          {scanResult && (
            <div className={`${scanResult.status === 'Fair' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className="flex items-start space-x-4">
                {scanResult.status === 'Fair' ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${scanResult.status === 'Fair' ? 'text-green-900' : 'text-red-900'}`}>{scanResult.status}</h3>
                  <p className={`${scanResult.status === 'Fair' ? 'text-green-700' : 'text-red-700'} mt-1`}>
                    {scanResult.status === 'Fair' 
                      ? "The model predictions do not show significant statistical bias against the selected protected groups."
                      : "The model predictions show statistically significant bias against protected groups based on the selected sensitive features."}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className={`bg-white p-4 rounded-md border ${scanResult.status === 'Fair' ? 'border-green-100' : 'border-red-100'} shadow-sm`}>
                  <div className="text-sm text-slate-500 font-medium">Disparate Impact Ratio</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{scanResult.disparateImpact}</div>
                  <div className={`text-xs ${scanResult.disparateImpact >= 0.8 ? 'text-green-600' : 'text-red-600'} mt-1 font-medium`}>
                    {scanResult.disparateImpact >= 0.8 ? 'Passes 80% Rule (value ≥ 0.8)' : 'Fails 80% Rule (value < 0.8)'}
                  </div>
                </div>
                <div className={`bg-white p-4 rounded-md border ${scanResult.status === 'Fair' ? 'border-green-100' : 'border-red-100'} shadow-sm`}>
                  <div className="text-sm text-slate-500 font-medium">Equal Opportunity Diff</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{scanResult.equalOpportunityDiff}</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">Absolute deviation</div>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setScanResult(null)}>Scan Another</Button>
                {scanResult.status !== 'Fair' && (
                  <Link href="/data-scientist/mitigate">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">Apply Mitigation</Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
