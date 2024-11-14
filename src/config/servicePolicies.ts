import { configHarrier } from "./configHarrier";

const awsAccountId = configHarrier.awsAccountId;

export const workflowLambdaPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: ["ec2:StartInstances", "ec2:StopInstances"],
      Resource: `arn:aws:ec2:*:${awsAccountId}:instance/*`,
      Condition: {
        StringEquals: {
          "ec2:ResourceTag/Agent": "Harrier-Runner",
        },
      },
    },
    {
      Sid: "VisualEditor1",
      Effect: "Allow",
      Action: ["ssm:SendCommand", "logs:CreateLogGroup"],
      Resource: [
        `arn:aws:ec2:*:${awsAccountId}:instance/*`,
        "arn:aws:ssm:*:*:document/AWS-RunShellScript",
        `arn:aws:logs:*:${awsAccountId}:log-group:*`,
      ],
    },
    {
      Sid: "VisualEditor2",
      Effect: "Allow",
      Action: [
        "logs:CreateLogStream",
        "s3:GetBucketTagging",
        "secretsmanager:GetSecretValue",
        "logs:PutLogEvents",
      ],
      Resource: [
        "arn:aws:s3:::harrier*",
        `arn:aws:secretsmanager:*:${awsAccountId}:secret:github/pat/harrier*`,
        `arn:aws:logs:*:${awsAccountId}:log-group:*:log-stream:*`,
      ],
    },
    {
      Sid: "VisualEditor3",
      Effect: "Allow",
      Action: ["ec2:DescribeInstances", "s3:ListAllMyBuckets"],
      Resource: "*",
    },
  ],
});
