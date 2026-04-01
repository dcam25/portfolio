resource "aws_amplify_app" "portfolio" {
  name       = var.project_name
  platform   = "WEB_COMPUTE"
  repository = var.repository_url

  # Build settings (Amplify Console)
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - nvm use 20
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - .next/cache/**/*
  EOT

  # Environment variables for the frontend build
  environment_variables = {
    NEXT_PUBLIC_API_URL = aws_apigatewayv2_stage.default.invoke_url
  }

  access_token = var.github_token
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.portfolio.id
  branch_name = var.github_branch

  enable_auto_build = true
}
