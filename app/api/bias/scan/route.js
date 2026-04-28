import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { datasetId, modelId, sensitiveFeatures, targetColumn, phase } = body;

    // Try to create the scan record in Firestore
    let scanRef = null;
    try {
      scanRef = adminDb.collection('biassScans').doc();
      await scanRef.set({
        datasetId,
        modelId: modelId || null,
        sensitiveFeatures,
        targetColumn,
        status: 'RUNNING',
        createdBy: 'demo-id',
        createdAt: new Date().toISOString()
      });
    } catch (firebaseErr) {
      console.warn("Firebase not fully configured. Skipping DB write.", firebaseErr.message);
    }

    // Forward to Python ML service
    const mlResponse = await fetch(`${process.env.ML_SERVICE_URL || 'http://localhost:8080'}/scan/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        dataset_id: datasetId, 
        model_id: modelId, 
        sensitive_features: sensitiveFeatures, 
        target_column: targetColumn, 
        phase,
        data_rows: body.data_rows
      })
    });

    if (!mlResponse.ok) {
      const errBody = await mlResponse.text();
      console.error("Python Server error:", errBody);
      throw new Error("ML Service failed");
    }
    const mlData = await mlResponse.json();
    
    if (mlData.error) {
      console.error("Python Logic Error:", mlData.error);
      throw new Error(mlData.error);
    }

    // Update scan record with results if Firebase is active
    if (process.env.FIREBASE_ADMIN_SDK_JSON) {
      await scanRef.update({
        status: 'COMPLETED',
        results: mlData,
        fairnessScore: mlData.overallFairnessScore,
        completedAt: new Date().toISOString()
      });

      const updatedScan = await scanRef.get();
      return NextResponse.json({ id: updatedScan.id, ...updatedScan.data() });
    } else {
      // Fallback for mock mode so UI doesn't crash
      return NextResponse.json({ id: "mock-id", status: "COMPLETED", results: mlData });
    }
    
  } catch (error) {
    console.error("Scan error:", error);
    return NextResponse.json({ error: 'Failed to run bias scan' }, { status: 500 });
  }
}
