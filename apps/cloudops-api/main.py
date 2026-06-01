from fastapi import FastAPI, Response
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST
import socket
import os
import time

app = FastAPI(
    title="CloudOps Lite API",
    description="A lightweight CloudOps API for Kubernetes, GitOps, CI/CD and monitoring demos.",
    version="1.0.0"
)

REQUEST_COUNT = Counter(
    "cloudops_api_requests_total",
    "Total number of requests received by the CloudOps API"
)

START_TIME = time.time()


@app.get("/")
def root():
    REQUEST_COUNT.inc()
    return {
        "message": "CloudOps Lite API is running",
        "project": "CloudOps Lite Platform",
        "status": "ok"
    }


@app.get("/health")
def health():
    REQUEST_COUNT.inc()
    return {
        "status": "healthy",
        "service": "cloudops-api"
    }


@app.get("/version")
def version():
    REQUEST_COUNT.inc()
    return {
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "environment": os.getenv("APP_ENV", "local"),
        "hostname": socket.gethostname()
    }


@app.get("/status")
def status():
    REQUEST_COUNT.inc()
    uptime_seconds = int(time.time() - START_TIME)

    return {
        "platform": "CloudOps Lite Platform",
        "service": "cloudops-api",
        "environment": os.getenv("APP_ENV", "local"),
        "uptime_seconds": uptime_seconds,
        "kubernetes": True
    }


@app.get("/metrics")
def metrics():
    REQUEST_COUNT.inc()
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
