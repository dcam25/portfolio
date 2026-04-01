variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "dane-portfolio"
}

variable "repository_url" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/dcam25/portfolio"
}

variable "github_branch" {
  description = "GitHub branch to deploy"
  type        = string
  default     = "main"
}

variable "openai_api_key" {
  description = "OpenAI API Key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "pinecone_api_key" {
  description = "Pinecone API Key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "pinecone_environment" {
  description = "Pinecone Environment"
  type        = string
  default     = ""
}

variable "pinecone_index_name" {
  description = "Pinecone Index Name"
  type        = string
  default     = ""
}

variable "github_token" {
  description = "GitHub Personal Access Token with repo scope"
  type        = string
  sensitive   = true
}
