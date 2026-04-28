from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ProxyRequest(BaseModel):
    dataset_id: str

@router.post("/")
async def detect_proxies(req: ProxyRequest):
    return {
        "proxies": [
            {"feature": "zip_code", "correlation": 0.7, "recommendation": "remove"},
            {"feature": "income", "correlation": 0.4, "recommendation": "reweight"}
        ]
    }
