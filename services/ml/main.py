from fastapi import FastAPI
from routers import bias_scan, mitigate, proxy

app = FastAPI(title="FairLens ML Service")

app.include_router(bias_scan.router, prefix="/scan")
app.include_router(mitigate.router, prefix="/mitigate")
app.include_router(proxy.router, prefix="/proxy")

@app.get("/")
def read_root():
    return {"message": "FairLens ML Service API is running"}
