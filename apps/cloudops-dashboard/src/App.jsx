import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://api.cloudops-demo.local";

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [health, setHealth] = useState(null);
  const [version, setVersion] = useState(null);
  const [status, setStatus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const loadData = async () => {
    try {
      const [healthRes, versionRes, statusRes] = await Promise.all([
        fetch(`${API_BASE}/health`),
        fetch(`${API_BASE}/version`),
        fetch(`${API_BASE}/status`),
      ]);

      setHealth(await healthRes.json());
      setVersion(await versionRes.json());
      setStatus(await statusRes.json());
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setHealth({ status: "unreachable", service: "cloudops-api" });
      setVersion({
        version: "unknown",
        environment: "unknown",
        hostname: "unknown",
      });
      setStatus({
        platform: "CloudOps Lite Platform",
        service: "cloudops-api",
        environment: "unknown",
        uptime_seconds: 0,
        kubernetes: false,
      });
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const isHealthy = health?.status === "healthy";

  return (
    <div className="page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <header className="hero">
        <div>
          <p className="eyebrow">Production-inspired cloud platform</p>
          <h1>CloudOps Lite Dashboard</h1>
          <p className="subtitle">
            A lightweight Kubernetes platform deployed on Hetzner with GitOps,
            CI/CD, container registry integration, monitoring, and secure
            deployment workflows.
          </p>
        </div>

        <div className={`status-pill ${isHealthy ? "healthy" : "danger"}`}>
          <span></span>
          {isHealthy ? "API Healthy" : "API Unreachable"}
        </div>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "overview" ? "tab active" : "tab"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "platform" ? "tab active" : "tab"}
          onClick={() => setActiveTab("platform")}
        >
          Platform
        </button>

        <button
          className={activeTab === "monitoring" ? "tab active" : "tab"}
          onClick={() => setActiveTab("monitoring")}
        >
          Monitoring
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <section className="cards-grid">
            <div className="card">
              <p className="card-label">API Health</p>
              <h2>{health?.status || "loading"}</h2>
              <p>{health?.service || "cloudops-api"}</p>
            </div>

            <div className="card">
              <p className="card-label">Environment</p>
              <h2>{version?.environment || status?.environment || "hetzner"}</h2>
              <p>Kubernetes runtime on k3s</p>
            </div>

            <div className="card">
              <p className="card-label">Version</p>
              <h2>{version?.version || "1.0.0"}</h2>
              <p>Built and pushed through CI/CD</p>
            </div>

            <div className="card">
              <p className="card-label">Pod Hostname</p>
              <h2>{version?.hostname || "loading"}</h2>
              <p>Running inside Kubernetes</p>
            </div>
          </section>

          <section className="panel">
            <div>
              <p className="eyebrow">Live application status</p>
              <h2>CloudOps API Runtime</h2>
              <p className="panel-text">
                The dashboard fetches live data from the FastAPI backend exposed
                through Traefik ingress on the Hetzner VPS.
              </p>
            </div>

            <div className="status-list">
              <div>
                <span>Platform</span>
                <strong>{status?.platform || "CloudOps Lite Platform"}</strong>
              </div>

              <div>
                <span>Service</span>
                <strong>{status?.service || "cloudops-api"}</strong>
              </div>

              <div>
                <span>Kubernetes</span>
                <strong>{status?.kubernetes ? "Enabled" : "Unknown"}</strong>
              </div>

              <div>
                <span>Uptime</span>
                <strong>
                  {status?.uptime_seconds
                    ? `${Math.floor(status.uptime_seconds)} seconds`
                    : "loading"}
                </strong>
              </div>

              <div>
                <span>Last updated</span>
                <strong>{lastUpdated || "loading"}</strong>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "platform" && (
        <>
          <section className="panel">
            <div>
              <p className="eyebrow">Deployment pipeline</p>
              <h2>GitOps Delivery Flow</h2>
              <p className="panel-text">
                Source code is pushed to GitHub, built by GitHub Actions,
                published to GHCR, and deployed to the Hetzner k3s cluster by
                FluxCD.
              </p>
            </div>

            <div className="pipeline">
              <div className="pipeline-step">
                <span>01</span>
                <h3>Code Push</h3>
                <p>Backend, frontend, and manifests are versioned in GitHub.</p>
              </div>

              <div className="pipeline-step">
                <span>02</span>
                <h3>CI/CD</h3>
                <p>GitHub Actions builds Docker images and pushes them to GHCR.</p>
              </div>

              <div className="pipeline-step">
                <span>03</span>
                <h3>GitOps Sync</h3>
                <p>FluxCD watches the repository and applies Kubernetes manifests.</p>
              </div>

              <div className="pipeline-step">
                <span>04</span>
                <h3>k3s Runtime</h3>
                <p>Traefik exposes the API and dashboard through ingress routes.</p>
              </div>
            </div>
          </section>

          <section className="tech-grid">
            <div>
              <h3>Infrastructure</h3>
              <p>Hetzner VPS, Ubuntu 24.04, k3s, Traefik</p>
            </div>

            <div>
              <h3>Application</h3>
              <p>FastAPI backend and React/Vite dashboard</p>
            </div>

            <div>
              <h3>Automation</h3>
              <p>GitHub Actions, GHCR, FluxCD, Kubernetes manifests</p>
            </div>

            <div>
              <h3>Security</h3>
              <p>Firewall rules, resource limits, controlled ingress exposure</p>
            </div>
          </section>
        </>
      )}

      {activeTab === "monitoring" && (
        <section className="panel monitoring-panel">
          <div>
            <p className="eyebrow">Observability layer</p>
            <h2>Monitoring & Metrics</h2>
            <p className="panel-text">
              Grafana and Prometheus are deployed on the Hetzner k3s cluster to
              monitor platform health, Kubernetes resources, and CloudOps API
              metrics.
            </p>
          </div>

          <div className="monitoring-grid">
            <div className="monitoring-card">
              <h3>Grafana</h3>
              <p>
                Visual dashboards for Kubernetes pods, CPU, memory, and platform
                health.
              </p>
              <a
                className="action-link"
                href="http://grafana.cloudops-demo.local"
                target="_blank"
                rel="noreferrer"
              >
                Open Grafana
              </a>
            </div>

            <div className="monitoring-card">
              <h3>Prometheus Metric</h3>
              <p>Custom FastAPI metric exposed by the CloudOps API.</p>
              <code>cloudops_api_requests_total</code>
            </div>

            <div className="monitoring-card">
              <h3>Metrics Endpoint</h3>
              <p>The backend exposes Prometheus-compatible metrics.</p>
              <a
                className="action-link"
                href="http://api.cloudops-demo.local/metrics"
                target="_blank"
                rel="noreferrer"
              >
                Open /metrics
              </a>
            </div>
          </div>

          <div className="monitoring-summary">
            <div>
              <span>Prometheus</span>
              <strong>Running</strong>
            </div>

            <div>
              <span>Grafana</span>
              <strong>Running</strong>
            </div>

            <div>
              <span>API Metrics</span>
              <strong>/metrics</strong>
            </div>

            <div>
              <span>Cluster</span>
              <strong>Hetzner k3s</strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
