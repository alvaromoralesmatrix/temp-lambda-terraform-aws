terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.20.0"
    }
  }
}
#configura la region a desplegar
provider "aws" {
  region = var.region
}

module "module_example" {
  source = "./example"
}