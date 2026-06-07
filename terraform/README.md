# Terraform Infrastructure

This folder contains Infrastructure as Code for the CloudOps Lite Platform.

## Purpose

Terraform is used to provision cloud infrastructure, while Flux CD is used to deploy Kubernetes workloads.

## Responsibilities

Terraform:
- Hetzner Cloud server provisioning
- SSH key injection
- Firewall rules
- Cloud-init bootstrap
- Infrastructure outputs

Flux CD:
- Kubernetes applications
- Ingress resources
- Monitoring resources
- GitOps reconciliation

## Environments

- `local/`: notes for the local laptop-based k3s environment
- `hetzner/`: future Hetzner Cloud infrastructure configuration

## Security

Never commit:
- `terraform.tfvars`
- Terraform state files
- API tokens
