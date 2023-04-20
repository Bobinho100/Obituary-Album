terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}

# two lambda functions w/ function url
# one dynamodb table
# roles and policies as needed
# step functions (if you're going for the bonus marks)
locals {
  function = "functions"
  function_create_obituary = "create-obituary-30112955"
  function_get_obituaries = "get-obituaries-30112955"

  handler_create_obituary = "main.handler"
  handler_get_obituaries = "main.handler"

  artifact_create_obituaries = "${local.function_create_obituary}/artifact.zip"
  artifact_get_obituaries = "${local.function_get_obituaries}/artifact.zip"
}


data "archive_file" "lambda_zip_create_obituary"{
  type = "zip"
  source_dir = "../functions/create-obituary"
  output_path = "${local.function_create_obituary}/artifact.zip"

}

data "archive_file" "lambda_zip_get_obituaries"{
  type = "zip"
  source_file = "../functions/get-obituaries/main.py"
  output_path = "${local.function_get_obituaries}/artifact.zip"

}


resource "aws_iam_role" "lambda_create_obituary" {
  name               = "iam-for-lambda-${local.function_create_obituary}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "lambda_get_obituaries" {
  name               = "iam-for-lambda-${local.function_get_obituaries}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


resource "aws_lambda_function" "create_obituary_lambda" {
  #s3_bucket = aws_s3_bucket.lambda.bucket
  # the artifact needs to be in the bucket first. Otherwise, this will fail.
  
  filename = data.archive_file.lambda_zip_create_obituary.output_path
  role = aws_iam_role.lambda_create_obituary.arn
  function_name = local.function_create_obituary
  handler = local.handler_create_obituary
  source_code_hash = data.archive_file.lambda_zip_create_obituary.output_base64sha256

  
 
 

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

resource "aws_lambda_function" "get_obituaries_lambda" {
  #s3_bucket = aws_s3_bucket.lambda.bucket
  # the artifact needs to be in the bucket first. Otherwise, this will fail.
  
  filename = data.archive_file.lambda_zip_get_obituaries.output_path
  role = aws_iam_role.lambda_get_obituaries.arn
  function_name = local.function_get_obituaries
  handler = local.handler_get_obituaries
  source_code_hash = data.archive_file.lambda_zip_get_obituaries.output_base64sha256

  
 
 

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}


# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "create_obituary_logs" {
  name        = "lambda-logging-${local.function_create_obituary}"
  description = "IAM policy for logging from a lambda for create obituary"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.the-last-show.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "get_obituaries_logs" {
  name        = "lambda-logging-${local.function_get_obituaries}"
  description = "IAM policy for logging from a lambda for get obituaries"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:Query"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.the-last-show.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "polly" {
  name        = "lambda-polly-${local.function}"
  description = "IAM policy for logging from a lambda for create obituary"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "polly:SynthesizeSpeech"
       
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "parameter-store" {
  name        = "lambda-store-${local.function}"
  description = "IAM policy for logging from a lambda for create obituary"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
       "ssm:GetParametersByPath"
       
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_parameter_store" {
  role       = aws_iam_role.lambda_create_obituary.name
  policy_arn = aws_iam_policy.parameter-store.arn
}

# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_polly" {
  role       = aws_iam_role.lambda_create_obituary.name
  policy_arn = aws_iam_policy.polly.arn
}


# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_create_obituary" {
  role       = aws_iam_role.lambda_create_obituary.name
  policy_arn = aws_iam_policy.create_obituary_logs.arn
}


# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "lambda_logs_get-obituaries" {
  role       = aws_iam_role.lambda_get_obituaries.name
  policy_arn = aws_iam_policy.get_obituaries_logs.arn
}



resource "aws_dynamodb_table" "the-last-show" {
  name         = "the-last-show-30112955"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  # we only need a student id to find an item in the table; therefore, we 
  # don't need a sort key here
  hash_key = "id"


  # the hash_key data type is string
  attribute {
    name = "id"
    type = "S"
  }


}

resource  "aws_lambda_function_url" "create_obituary_function_url" {
  function_name = aws_lambda_function.create_obituary_lambda.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins = ["*"]
    allow_methods = ["POST"]
    allow_headers = ["*"]
    expose_headers = ["Keep-alive", "date"]
  }
}


resource  "aws_lambda_function_url" "get_obituaries_function_url" {
  function_name = aws_lambda_function.get_obituaries_lambda.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins = ["*"]
    allow_methods = ["GET"]
    allow_headers = ["*"]
    expose_headers = ["Keep-alive", "date"]
  }
}


output "get_obituaries_function_url" {
  value = aws_lambda_function_url.get_obituaries_function_url.function_url
}

output "create_obituary_function_url" {
  value = aws_lambda_function_url.create_obituary_function_url.function_url
}