from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Any, Dict
import pandas as pd

router = APIRouter()

class ScanRequest(BaseModel):
    dataset_id: str
    model_id: Optional[str] = None
    sensitive_features: List[str]
    target_column: str
    phase: Optional[str] = None
    data_rows: Optional[List[Dict[str, Any]]] = None

@router.post("/")
async def run_bias_scan(req: ScanRequest):
    if not req.data_rows or len(req.data_rows) == 0:
        return {"error": "No data rows provided for analysis."}

    # Load data into pandas
    df = pd.DataFrame(req.data_rows)
    
    if req.target_column not in df.columns or req.sensitive_features[0] not in df.columns:
        return {"error": "Target or sensitive column missing from data."}
        
    # Convert target to numeric
    df[req.target_column] = pd.to_numeric(df[req.target_column], errors='coerce')
    df = df.dropna(subset=[req.target_column, req.sensitive_features[0]])
    
    sensitive_col = req.sensitive_features[0]
    
    # Calculate acceptance rates by sensitive group
    group_rates = df.groupby(sensitive_col)[req.target_column].mean()
    
    if group_rates.empty:
        return {"error": "Could not calculate group rates."}
        
    max_rate = group_rates.max()
    min_rate = group_rates.min()
    
    # 80% Rule (Disparate Impact)
    disparate_impact = (min_rate / max_rate) if max_rate > 0 else 1.0
    equal_opportunity_diff = max_rate - min_rate
    
    status = "Fair"
    recommendation = "No mitigation required."
    
    if disparate_impact < 0.8:
        status = "High Bias Detected"
        recommendation = f"Apply Reweighing Mitigation on feature: {sensitive_col}"
        
    return {
        "overallFairnessScore": round(disparate_impact, 2),
        "metrics": {
            "disparateImpact": round(disparate_impact, 3),
            "equalOpportunityDiff": round(equal_opportunity_diff, 3),
            "status": status,
            "recommendation": recommendation,
            "groupRates": group_rates.to_dict()
        }
    }
