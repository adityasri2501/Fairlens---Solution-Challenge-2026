import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { datasetId } = body;

    const mlResponse = await fetch(`${process.env.ML_SERVICE_URL || 'http://localhost:8000'}/proxy/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset_id: datasetId })
    });

    if (!mlResponse.ok) {
      throw new Error("ML Proxy Service failed");
    }

    const mlData = await mlResponse.json();
    return NextResponse.json(mlData);
    
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: 'Failed to analyze proxies' }, { status: 500 });
  }
}
