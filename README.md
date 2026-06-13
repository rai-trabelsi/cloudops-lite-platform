# CloudOps Lite Platform

> A lightweight production-inspired CloudOps platform deployed on a Hetzner VPS using Kubernetes, GitOps, CI/CD, container images, monitoring, and infrastructure-as-code practices.

---

## Project Overview

CloudOps Lite Platform is an end-to-end DevOps and Cloud Engineering project designed to demonstrate how a modern application can be built, containerized, deployed, monitored, and managed using real-world cloud-native tools.

The platform runs on a Hetzner VPS with a lightweight Kubernetes cluster powered by k3s. It includes a FastAPI backend, a React dashboard, GitHub Actions CI/CD pipelines, GitHub Container Registry, FluxCD GitOps deployment, Traefik ingress, Prometheus metrics, Grafana dashboards, and Terraform infrastructure files.

This project was built as a portfolio-grade CloudOps platform to demonstrate practical skills in Kubernetes, automation, observability, cloud deployment, and infrastructure management.

---

## Key Features

* FastAPI backend exposing health, version, status, and metrics endpoints
* React/Vite dashboard showing live platform status
* Kubernetes deployment on Hetzner VPS using k3s
* GitOps deployment workflow using FluxCD
* CI/CD automation with GitHub Actions
* Container image publishing to GitHub Container Registry
* Traefik ingress for API, dashboard, and Grafana access
* Prometheus-compatible application metrics
* Grafana monitoring layer
* Terraform structure for Hetzner infrastructure automation
* Basic security practices with firewall rules and controlled ingress exposure
* Lightweight architecture suitable for a small VPS

---

## Architecture

```text
Developer / GitHub
       |
       | git push
       v
GitHub Repository
       |
       | GitHub Actions
       v
Docker Images built and pushed to GHCR
       |
       | FluxCD watches Git repository
       v
Hetzner VPS
       |
       v
k3s Kubernetes Cluster
       |
       |-- Traefik Ingress
       |-- CloudOps API
       |-- CloudOps Dashboard
       |-- Prometheus
       |-- Grafana
       |-- FluxCD Controllers
```

---

## High-Level System Flow

```text
User Browser
   |
   | http://dashboard.cloudops-demo.local
   v
Traefik Ingress
   |
   v
React Dashboard
   |
   | API calls
   v
FastAPI Backend
   |
   | /metrics
   v
Prometheus
   |
   v
Grafana
```

---

## Technology Stack

| Layer                  | Technology                |
| ---------------------- | ------------------------- |
| Cloud Provider         | Hetzner Cloud             |
| Operating System       | Ubuntu Server             |
| Kubernetes             | k3s                       |
| Ingress Controller     | Traefik                   |
| Backend                | FastAPI                   |
| Frontend               | React + Vite              |
| Container Registry     | GitHub Container Registry |
| CI/CD                  | GitHub Actions            |
| GitOps                 | FluxCD                    |
| Monitoring             | Prometheus                |
| Visualization          | Grafana                   |
| Infrastructure as Code | Terraform                 |
| Firewall               | Hetzner Firewall + UFW    |

---

## Repository Structure

```text
cloudops-lite-platform/
├── apps/
│   ├── cloudops-api/
│   │   ├── main.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   │
│   └── cloudops-dashboard/
│       ├── src/
│       ├── Dockerfile
│       └── package.json
│
├── clusters/
│   ├── local/
│   │   └── local Kubernetes manifests
│   │
│   └── hetzner/
│       ├── cloudops-api.yaml
│       ├── cloudops-api-ingress.yaml
│       ├── cloudops-dashboard.yaml
│       ├── cloudops-dashboard-ingress.yaml
│       └── kustomization.yaml
│
├── terraform/
│   └── hetzner/
│       ├── provider.tf
│       ├── server.tf
│       ├── firewall.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── cloud-init.yaml
│
├── .github/
│   └── workflows/
│       ├── ci-cloudops-api.yml
│       └── ci-cloudops-dashboard.yml
│
├── docs/
│   ├── screenshots/
│   └── videos/
│
└── README.md
```

---

## Applications

### CloudOps API

The backend is built with FastAPI and exposes operational endpoints used by the dashboard and monitoring system.

| Endpoint   | Purpose                                |
| ---------- | -------------------------------------- |
| `/`        | Root API endpoint                      |
| `/health`  | Health check                           |
| `/version` | API version, environment, and hostname |
| `/status`  | Runtime and Kubernetes status          |
| `/metrics` | Prometheus-compatible metrics          |

Example:

```bash
curl http://api.cloudops-demo.local/health
```

Expected response:

```json
{
  "status": "healthy",
  "service": "cloudops-api"
}
```

---

### CloudOps Dashboard

The frontend is built with React and Vite.

The dashboard displays:

* API health status
* Environment information
* API version
* Pod hostname
* Kubernetes runtime status
* GitOps delivery flow
* Monitoring links
* Grafana and metrics access

Dashboard URL:

```text
http://dashboard.cloudops-demo.local
```

---

## CI/CD Pipeline

GitHub Actions is used to automate the build and publishing process.

### API Pipeline

The API workflow:

1. Checks out the repository
2. Builds the FastAPI Docker image
3. Logs in to GitHub Container Registry
4. Pushes the image to GHCR

### Dashboard Pipeline

The dashboard workflow:

1. Checks out the repository
2. Builds the React/Vite application
3. Creates an Nginx-based Docker image
4. Pushes the image to GHCR

Container images are published to:

```text
ghcr.io/rai-trabelsi/cloudops-api
ghcr.io/rai-trabelsi/cloudops-dashboard
```

---

## GitOps with FluxCD

FluxCD is installed inside the k3s cluster and connected to the GitHub repository.

Flux watches the `clusters/hetzner` directory and applies Kubernetes manifests automatically.

Useful commands:

```bash
flux get sources git
flux get kustomizations
kubectl get pods -n flux-system
```

Expected result:

```text
READY True
Applied revision
```

This means the cluster is synchronized from GitHub using a GitOps workflow.

---

## Kubernetes Deployment

The platform is deployed inside the `apps` namespace.

Useful commands:

```bash
kubectl get nodes -o wide
kubectl get pods -A
kubectl get pods -n apps
kubectl get svc -n apps
kubectl get ingress -n apps
```

Expected application pods:

```text
cloudops-api        Running
cloudops-dashboard  Running
```

Expected ingresses:

```text
api.cloudops-demo.local
dashboard.cloudops-demo.local
```

---

## Ingress and Routing

Traefik is used as the ingress controller.

| Service   | Host                            |
| --------- | ------------------------------- |
| API       | `api.cloudops-demo.local`       |
| Dashboard | `dashboard.cloudops-demo.local` |
| Grafana   | `grafana.cloudops-demo.local`   |


---

## Monitoring and Observability

The monitoring stack is deployed using Prometheus and Grafana.

### Monitoring Components
| Component          | Purpose                   |
| ------------------ | ------------------------- |
| Prometheus         | Metrics collection        |
| Grafana            | Metrics visualization     |
| kube-state-metrics | Kubernetes object metrics |
| node-exporter      | Node-level metrics        |
| ServiceMonitor     | API metrics scraping      |

### Application Metric

The FastAPI backend exposes a custom Prometheus metric:

```text
cloudops_api_requests_total
```

Metrics endpoint:

```text
http://api.cloudops-demo.local/metrics
```

Grafana URL:

```text
http://grafana.cloudops-demo.local
```

---

## Security Practices

The project includes basic security practices suitable for a lightweight CloudOps environment.

### Firewall

Only required public ports are exposed:

| Port | Purpose             |
| ---- | ------------------- |
| 22   | SSH                 |
| 80   | HTTP                |
| 443  | HTTPS-ready ingress |

Prometheus, Grafana internals, Kubernetes API, and application services are not directly exposed as public NodePorts.

### Kubernetes Security Basics

The deployment structure includes:

* Internal ClusterIP services
* Traefik-managed ingress exposure
* Resource requests and limits
* Namespace separation
* GitOps-controlled manifests
* Containerized workloads

---

## Infrastructure as Code

The repository includes a Terraform structure for Hetzner infrastructure automation.

Terraform files include:

```text
provider.tf
server.tf
firewall.tf
variables.tf
outputs.tf
cloud-init.yaml
```

This provides a reproducible infrastructure foundation for future cloud provisioning.

---

## Screenshots



```text
docs/screenshots/
├── 01-hetzner-server-overview.png
├── 02-hetzner-firewall-rules.png
├── 03-kubernetes-node-ready.png
├── 04-kubernetes-all-pods.png
├── 05-apps-ingress.png
├── 06-flux-git-source.png
├── 07-flux-kustomization.png
├── 08-dashboard-main.png
├── 09-api-health.png
├── 10-api-metrics.png
├── 11-github-actions-green.png
├── 12-ghcr-packages.png
├── 13-grafana-dashboard.png
└── 14-prometheus-api-metric.png
```

Example placeholders:

```markdown
![Dashboard](docs/screenshots/08-dashboard-main.png)

![Kubernetes Pods](docs/screenshots/04-kubernetes-all-pods.png)

![Grafana Dashboard](docs/screenshots/13-grafana-dashboard.png)
```

---

## Demo Video

link here:




---

## Local Development

### Run the API locally

```bash
cd apps/cloudops-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

API local URL:

```text
http://localhost:8000
```

---

### Run the dashboard locally

```bash
cd apps/cloudops-dashboard
npm install
npm run dev -- --host 0.0.0.0
```

Dashboard local URL:

```text
http://localhost:5173
```

---

## Deployment Workflow

### 1. Push code to GitHub

```bash
git add .
git commit -m "update cloudops platform"
git push
```

### 2. GitHub Actions builds images

The API and dashboard images are built and pushed to GHCR.

### 3. FluxCD synchronizes manifests

```bash
flux reconcile source git flux-system
flux reconcile kustomization flux-system
```

### 4. Kubernetes runs the updated workloads

```bash
kubectl get pods -n apps
kubectl rollout status deployment cloudops-api -n apps
kubectl rollout status deployment cloudops-dashboard -n apps
```

---

## Useful Commands

### Cluster

```bash
kubectl get nodes -o wide
kubectl get pods -A
kubectl get ingress -A
```

### Applications

```bash
kubectl get pods -n apps
kubectl get svc -n apps
kubectl get ingress -n apps
```

### Flux

```bash
flux get sources git
flux get kustomizations
kubectl get pods -n flux-system
```

### Monitoring

```bash
kubectl get pods -n monitoring
kubectl get servicemonitor -n apps
```

### API Tests

```bash
curl http://api.cloudops-demo.local/health
curl http://api.cloudops-demo.local/status
curl http://api.cloudops-demo.local/metrics
```

---

## Project Status

| Component              | Status      |
| ---------------------- | ----------- |
| FastAPI backend        | Completed   |
| React dashboard        | Completed   |
| Docker images          | Completed   |
| GitHub Actions CI/CD   | Completed   |
| GHCR registry          | Completed   |
| k3s deployment         | Completed   |
| FluxCD GitOps          | Completed   |
| Traefik ingress        | Completed   |
| Hetzner VPS deployment | Completed   |
| Prometheus monitoring  | Completed   |
| Grafana dashboard      | Completed   |
| Terraform structure    | Completed   |
| Documentation          | Completed   |
| Demo video             | Completed   |

---

## Skills Demonstrated

This project demonstrates practical experience with:

* Kubernetes deployment and operations
* GitOps workflows
* CI/CD pipelines
* Containerization
* Cloud VPS deployment
* Monitoring and observability
* Infrastructure as Code
* Linux server administration
* Firewall and ingress configuration
* Application health checks
* Prometheus metrics
* Portfolio-ready DevOps documentation

---

## Future Improvements

Planned improvements:

* Add a real domain name
* Enable HTTPS with cert-manager or Traefik ACME
* Improve Grafana dashboards
* Add alerting rules
* Add sealed secrets or external secret management
* Use immutable image tags instead of static version tags
* Add staging and production environments
* Add automated Terraform provisioning workflow
* Add backup and restore documentation

---

## Author

**Rai Trabelsi**

Cloud / DevOps / Platform Engineering Portfolio Project

GitHub: `rai-trabelsi`

---

## License

This project is intended for educational and portfolio purposes.

