output "server_ipv4" {
  description = "Public IPv4 address of the Hetzner server"
  value       = hcloud_server.cloudops.ipv4_address
}

output "server_ipv6" {
  description = "Public IPv6 address of the Hetzner server"
  value       = hcloud_server.cloudops.ipv6_address
}

output "ssh_command" {
  description = "SSH command to access the server"
  value       = "ssh root@${hcloud_server.cloudops.ipv4_address}"
}

output "cloudops_note" {
  description = "Next manual step after Terraform apply"
  value       = "After server creation, SSH into the server and bootstrap Flux using clusters/hetzner."
}
