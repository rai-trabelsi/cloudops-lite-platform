resource "hcloud_ssh_key" "default" {
  name       = "${var.project_label}-ssh-key"
  public_key = file(var.ssh_public_key_path)
}
