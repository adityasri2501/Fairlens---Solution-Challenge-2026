import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { scanId, technique, phase, parameters } = body;

    // Call ML service (Mocked)
    const mlResponse = await fetch(`${process.env.ML_SERVICE_URL || 'http://localhost:8080'}/mitigate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scan_id: scanId, technique, phase, parameters })
    });

    if (!mlResponse.ok) {
      throw new Error("ML Service failed");
    }

    const mlData = await mlResponse.json();

    // Record mitigation in Firestore
    if (process.env.FIREBASE_ADMIN_SDK_JSON) {
      const mitigationRef = adminDb.collection('mitigations').doc();
      await mitigationRef.set({
        scanId,
        technique,
        phase,
        parameters: parameters || null,
        beforeScore: mlData.before_score,
        afterScore: mlData.after_score,
        appliedBy: 'demo-id',
        appliedAt: new Date().toISOString()
      });

      const newMitigation = await mitigationRef.get();
      return NextResponse.json({ id: newMitigation.id, ...newMitigation.data() });
    } else {
      return NextResponse.json({ 
        id: "mock-mitigate", 
        scanId, technique, 
        beforeScore: mlData.before_score, 
        afterScore: mlData.after_score 
      });
    }
    
  } catch (error) {
    console.error("Mitigate error:", error);
    return NextResponse.json({ error: 'Failed to apply mitigation' }, { status: 500 });
  }
}
