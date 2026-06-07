
variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "server_name" {
  description = "Name of the Hetzner server"
  type        = string
  default     = "cloudops-lite-k3s"
}

variable "server_type" {
  description = "Hetzner Cloud server type"
  type        = string
  default     = "cx22"
}

variable "server_location" {
  description = "Hetzner Cloud location"
  type        = string
  default     = "fsn1"
}

variable "server_image" {
  description = "Operating system image"
  type        = string
  default     = "ubuntu-24.04"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}

variable "allowed_ssh_ip" {
  description = "CIDR allowed to SSH into the server. Use x.x.x.x/32 for your IP or 0.0.0.0/0 temporarily."
  type        = string
  default     = "0.0.0.0/0"
}

variable "project_label" {
  description = "Project label"
  type        = string
  default     = "cloudops-lite-platform"
}
