# Local Environment Notes

The local CloudOps Lite Platform runs on an Ubuntu Server laptop using k3s.

Terraform is not used to provision the local laptop because the hardware already exists and Kubernetes workloads are managed by Flux CD.

Local environment responsibilities:
- Ubuntu Server
- k3s single-node cluster
- Traefik ingress
- Flux CD
- Prometheus and Grafana
- CloudOps API and dashboard

Terraform will be used for the future Hetzner Cloud environment.
