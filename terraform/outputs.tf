output "amplify_app_url" {
  value = aws_amplify_app.portfolio.default_domain
}

output "api_gateway_url" {
  value = aws_apigatewayv2_stage.default.invoke_url
}
