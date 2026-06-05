import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://cloudops.local";

function App() {
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
      setHealth({
        status: "unreachable",
        service: "cloudops-api",
      });

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
          <p className="eyebrow">Production-inspired local platform</p>
          <h1>CloudOps Lite Dashboard</h1>
          <p className="subtitle">
            A lightweight Kubernetes platform with GitOps, CI/CD, monitoring,
            container registry integration, and secure deployment workflows.
          </p>
        </div>

        <div className={`status-pill ${isHealthy ? "healthy" : "danger"}`}>
          <span></span>
          {isHealthy ? "API Healthy" : "API Unreachable"}
        </div>
      </header>

      <section className="cards-grid">
        <div className="card highlight">
          <p className="card-label">API Health</p>
          <h2>{health?.status || "loading"}</h2>
          <p>{health?.service || "cloudops-api"}</p>
        </div>

        <div className="card">
          <p className="card-label">Environment</p>
          <h2>{version?.environment || "loading"}</h2>
          <p>GitOps controlled deployment</p>
        </div>

        <div className="card">
          <p className="card-label">Version</p>
          <h2>{version?.version || "loading"}</h2>
          <p>Image deployed from GHCR</p>
        </div>

        <div className="card">
          <p className="card-label">Pod Hostname</p>
          <h2 className="small-text">{version?.hostname || "loading"}</h2>
          <p>Kubernetes workload identity</p>
        </div>
      </section>

      <section className="main-grid">
        <div className="panel large">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Platform architecture</p>
              <h3>CloudOps delivery workflow</h3>
            </div>
            <span className="badge">Live</span>
          </div>

          <div className="pipeline">
            <div className="pipeline-step">
              <span>01</span>
              <strong>Code Push</strong>
              <p>
                Developer pushes application or infrastructure changes to GitHub.
              </p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-step">
              <span>02</span>
              <strong>CI/CD</strong>
              <p>
                GitHub Actions builds Docker images and publishes them to GHCR.
              </p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-step">
              <span>03</span>
              <strong>GitOps</strong>
              <p>
                Flux CD reconciles Kubernetes manifests from the Git repository.
              </p>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-step">
              <span>04</span>
              <strong>k3s Runtime</strong>
              <p>
                Traefik exposes services while Prometheus and Grafana monitor the
                platform.
              </p>
            </div>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Runtime</p>
          <h3>Service status</h3>

          <ul className="status-list">
            <li>
              <span className="dot healthy-dot"></span>
              FastAPI backend
            </li>
            <li>
              <span className="dot healthy-dot"></span>
              Kubernetes service
            </li>
            <li>
              <span className="dot healthy-dot"></span>
              Traefik ingress
            </li>
            <li>
              <span className="dot healthy-dot"></span>
              Prometheus metrics
            </li>
            <li>
              <span className="dot healthy-dot"></span>
              Grafana dashboards
            </li>
          </ul>
        </div>
      </section>

      <section className="stack-section">
        <div className="panel">
          <p className="eyebrow">Infrastructure stack</p>
          <h3>Technologies used</h3>

          <div className="tech-grid">
            <span>Ubuntu Server</span>
            <span>k3s</span>
            <span>Docker</span>
            <span>GitHub Actions</span>
            <span>GHCR</span>
            <span>Flux CD</span>
            <span>Traefik</span>
            <span>Prometheus</span>
            <span>Grafana</span>
            <span>FastAPI</span>
            <span>React</span>
            <span>Vite</span>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Live refresh</p>
          <h3>{lastUpdated || "loading"}</h3>
          <p className="muted">
            The dashboard refreshes every 10 seconds and reads live data from the
            CloudOps backend API.
          </p>

          <p className="muted">
            Platform: {status?.platform || "CloudOps Lite Platform"}
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
