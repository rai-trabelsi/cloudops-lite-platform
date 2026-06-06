# Security Hardening

This project applies basic production-inspired security practices for a lightweight local CloudOps platform.

## Workload Security

The API and dashboard workloads use Kubernetes security contexts:

- run as non-root users
- privilege escalation disabled
- Linux capabilities dropped
- CPU and memory requests/limits defined

## CI/CD Security

GitHub Actions pipelines build container images and push them to GitHub Container Registry.

Trivy scanning is integrated into the API and dashboard pipelines to detect high and critical vulnerabilities in container images.

Current mode:

- scan enabled
- high/critical vulnerabilities reported
- pipeline does not fail yet during learning phase

Future improvement:

- change Trivy `exit-code` from `0` to `1`
- block deployment when high/critical vulnerabilities are detected

## Network Security

The platform uses Traefik Ingress to expose only required services:

- CloudOps API
- CloudOps Dashboard
- Grafana

Local DNS is handled using the Windows hosts file.

For cloud deployment, firewall rules will be managed using Terraform.

## Secrets

No real secrets are committed to the repository.

GitHub tokens and Terraform variables should be handled as environment variables or local `.tfvars` files excluded by `.gitignore`.

## Future Improvements

- HTTPS with cert-manager and Let's Encrypt
- stricter NetworkPolicies
- private GHCR images with imagePullSecrets
- SOPS or Sealed Secrets
- fail2ban on VPS
- Terraform-managed firewall
