

  # subir y desplegar
  resource "aws_lambda_function" "create" {
    function_name = "${var.project}-${var.function_name}"
    s3_bucket        = "bucket-${var.env}-example-app-01"  # Nombre del bucket de S3
    s3_key           = "app.zip"     # Ruta en el bucket al archivo ZIP
    source_code_hash = filebase64sha256("../app.zip")
    runtime = "nodejs16.x"
    handler = "src/functions/example/handler.main"
    role = aws_iam_role.iam_for_lambda.arn

    environment {
      variables = {
        DYN_CODENITY_DIMENTION = "dyn-codenity-example"
      }
    }
  }

  resource "aws_iam_role" "iam_for_lambda" {
    name = "rol-${var.env}-${var.project}-${var.function_name}-01"
    assume_role_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow",
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        }
      ]
    })
  }
  resource "aws_iam_policy" "main_policy" {
    name = "policy-${var.env}-${var.project}-${var.function_name}-01"
    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [
        {
          Effect = "Allow",
          Action = [
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:Query",
            "dynamodb:DeleteItem",
            "kms:Decrypt",
            "kms:Encrypt",
            "secretsmanager:GetSecretValue"
          ],
          Resource = "*"
        },
        {
          Effect = "Allow",
          Action = [
            "logs:CreateLogStream",
            "logs:DescribeLogStreams",
            "logs:CreateLogGroup",
            "logs:PutLogEvents"
          ],
          Resource = "*"
        },
      ]
    })
  }
  resource "aws_iam_role_policy_attachment" "main_role_policy_attachment" {
    role       = aws_iam_role.iam_for_lambda.name
    policy_arn = aws_iam_policy.main_policy.arn
  }


