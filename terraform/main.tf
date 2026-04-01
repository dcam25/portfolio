terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }
  cloud {
    organization = "portfolio-deploy"

    workspaces {
      name = "portfolio"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Service = var.project_name
    }
  }
}
