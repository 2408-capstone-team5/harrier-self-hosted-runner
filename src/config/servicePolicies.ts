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

export const cacheEvictionLambdaPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: "logs:CreateLogGroup",
      Resource: `arn:aws:logs:*:${awsAccountId}:*`,
    },
    {
      Sid: "VisualEditor1",
      Effect: "Allow",
      Action: [
        "logs:CreateLogStream",
        "s3:ListBucket",
        "s3:DeleteObject",
        "logs:PutLogEvents",
      ],
      Resource: [
        "arn:aws:s3:::harrier-s3*",
        `arn:aws:logs:*:${awsAccountId}:log-group:/aws/lambda/s3CacheCleanupLambda:*`,
      ],
    },
    {
      Sid: "VisualEditor2",
      Effect: "Allow",
      Action: "s3:ListAllMyBuckets",
      Resource: "*",
    },
  ],
});

export const runnerInstancePolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket",
        "s3:GetBucketTagging",
      ],
      Resource: ["arn:aws:s3:::harrier*", "arn:aws:s3:::harrier*/*"],
    },
    {
      Effect: "Allow",
      Action: ["s3:ListAllMyBuckets"],
      Resource: "*",
    },
    {
      Effect: "Allow",
      Action: ["ssm:SendCommand"],
      Resource: [
        `arn:aws:ec2:*:${awsAccountId}:instance/*`,
        "arn:aws:ssm:*:*:document/AWS-RunShellScript",
      ],
    },
    {
      Sid: "VisualEditor0",
      Effect: "Allow",
      Action: [
        "cloudwatch:PutMetricData",
        "ssm:DescribeInstanceInformation",
        "ssm:GetDeployablePatchSnapshotForInstance",
        "ec2messages:*",
        "ssm:ListDocuments",
        "ssmmessages:*",
        "ssm:DescribeAvailablePatches",
      ],
      Resource: "*",
    },
    {
      Sid: "VisualEditor1",
      Effect: "Allow",
      Action: "logs:CreateLogGroup",
      Resource: `arn:aws:logs:*:${awsAccountId}:log-group:*`,
    },
    {
      Sid: "VisualEditor2",
      Effect: "Allow",
      Action: [
        "ssm:UpdatePatchBaseline",
        "ssm:SendCommand",
        "ssm:DescribeAssociation",
        "ssm:DescribeDocument",
        "ssm:UpdateDocumentDefaultVersion",
        "ssm:UpdateAssociation",
        "ssm:ListInstanceAssociations",
        "ssm:DescribeEffectiveInstanceAssociations",
        "ssm:GetParameters",
        "logs:PutLogEvents",
        "ssm:GetParameter",
        "ssm:UpdateAssociationStatus",
        "ssm:UpdateServiceSetting",
        "logs:CreateLogStream",
        "ssm:StartAssociationsOnce",
        "ssm:UpdateInstanceInformation",
        "ssm:ListTagsForResource",
        "ssm:DescribeDocumentParameters",
        "ssm:DescribeEffectivePatchesForPatchBaseline",
        "ssm:GetDocument",
        "ssm:GetParametersByPath",
        "ssm:UpdateManagedInstanceRole",
      ],
      Resource: [
        `arn:aws:logs:*:${awsAccountId}:log-group:*:log-stream:*`,
        "arn:aws:s3:::*",
        `arn:aws:ssm:*:${awsAccountId}:managed-instance/*`,
        `arn:aws:ssm:*:${awsAccountId}:automation-execution/*`,
        `arn:aws:ssm:*:${awsAccountId}:maintenancewindow/*`,
        `arn:aws:ssm:*:${awsAccountId}:document/*`,
        `arn:aws:ssm:*:${awsAccountId}:servicesetting/*`,
        `arn:aws:ssm:*:${awsAccountId}:association/*`,
        `arn:aws:ssm:*:${awsAccountId}:opsitem/*`,
        `arn:aws:iam::${awsAccountId}:role/*`,
        `arn:aws:ssm:*:${awsAccountId}:opsmetadata/*`,
        `arn:aws:ssm:*:${awsAccountId}:parameter/*`,
        `arn:aws:ec2:*:${awsAccountId}:instance/*`,
        `arn:aws:ssm:*:${awsAccountId}:patchbaseline/*`,
        `arn:aws:ssm:*:${awsAccountId}:automation-definition/*:*`,
      ],
    },
  ],
});

export const eventBridgeSchedulerPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: ["lambda:InvokeFunction"],
      Resource: [
        `arn:aws:lambda:us-east-1:${awsAccountId}:function:s3CacheCleanupLambda:*`,
        `arn:aws:lambda:us-east-1:${awsAccountId}:function:s3CacheCleanupLambda`,
      ],
    },
  ],
});
