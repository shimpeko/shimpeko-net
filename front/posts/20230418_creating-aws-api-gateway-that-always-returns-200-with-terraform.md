---
title: Creating AWS API Gateway that always returns 200 with Terraform
published_time: 2023-04-18 20:24:28
---

Today I have created an AWS API Gateway that returns 200 for all requests with terraform.
Other option was to use ALB with static response, but I chose API Gateway because it doesn't require working target group such as EC2 instance.

The endpoint consists of a bunch of terraform resources.

```
# This resource is a most outer resource. Kind of a container for other resources.
resource "aws_api_gateway_rest_api" "my_api" {
  name = "my-api"
}

# Method defines a HTTP method (GET, POST, etc) for an API resource.
resource "aws_api_gateway_method" "my_api" {
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  # An API resource maps to a path in the API. Root resource is "/".
  # For example, "users" resource can be mapped to "/users" path.
  resource_id   = aws_api_gateway_rest_api.my_api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

# Integration defines how an API Gateway interacts with a backend.
# In my case, I use "MOCK" integration type to return 200 for all requests.
resource "aws_api_gateway_integration" "my_api" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_rest_api.my_api.root_resource_id
  http_method = aws_api_gateway_method.my_api.http_method
  type        = "MOCK"

  # This specifies the response code returned by "MOCK" integration.
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Integration response defines how to process a response from a backend.
# We can transform a response from a backend by defining template.
# In my case, I pass through the response from the backend.
resource "aws_api_gateway_integration_response" "my_api" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_rest_api.my_api.root_resource_id
  http_method = aws_api_gateway_method.my_api.http_method
  status_code = aws_api_gateway_method_response.my_api.status_code
}

# Method response defines mapping between a response from a backend and a model.
# In my case, I pass through the response from the backend without mapping to a model.
resource "aws_api_gateway_method_response" "my_api" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_rest_api.my_api.root_resource_id
  http_method = aws_api_gateway_method.my_api.http_method
  status_code = "200"
}

# Deployment is not a AWS resource but a special resource to trigger a deployment to a stage.
resource "aws_api_gateway_deployment" "my_api" {
  depends_on = [
    aws_api_gateway_integration.my_api,
    aws_api_gateway_integration_response.my_api,
  ]

  rest_api_id = aws_api_gateway_rest_api.my_api.id

  # This triggers deployment when the content of this file changes.
  triggers = {
    redeployment = filesha1("snowplow-bdp-dummy-endpoint.tf")
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Stage defines a deployment stage (ex. production, staging, etc) for a API.
resource "aws_api_gateway_stage" "my_api" {
  deployment_id = aws_api_gateway_deployment.my_api.id
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  stage_name    = "mock"
}

# Some configurations such as metrics, logging, etc can be defined per stage/path/method
# using "api_gateway_method_settings" (https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_method_settings).
# In my case, I don't have the resource as my API uses default settings.
```

The following resources are for custom domain name.

```
# Domain name defines a custom domain name.
resource "aws_api_gateway_domain_name" "my_api" {
  certificate_arn = aws_acm_certificate_validation.dummy_shimpeko_net.certificate_arn
  domain_name     = "dummy.shimpeko.net"
}

# Base path mapping defines a mapping between a custom domain name and a stage.
# With providing "base_path" argument, we can map a domain to a specific path (ex. /api) of a stage.
resource "aws_api_gateway_base_path_mapping" "my_api" {
  api_id      = aws_api_gateway_rest_api.my_api.id
  domain_name = aws_api_gateway_domain_name.my_api.domain_name
  stage_name  = aws_api_gateway_stage.my_api.stage_name
}

resource "aws_route53_record" "my_api" {
  name    = aws_api_gateway_domain_name.my_api.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.shimpeko_net.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.my_api.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.my_api.cloudfront_zone_id
  }
}
```
