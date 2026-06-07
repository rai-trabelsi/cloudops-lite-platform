resource "hcloud_server" "cloudops" {
  name        = var.server_name
  image       = var.server_image
  server_type = var.server_type
  location    = var.server_location

  ssh_keys = [
    hcloud_ssh_key.default.id
  ]

  firewall_ids = [
    hcloud_firewall.cloudops.id
  ]

  user_data = file("${path.module}/cloud-init.yaml")

  labels = {
    project = var.project_label
    role    = "k3s-node"
    env     = "hetzner"
  }
}
