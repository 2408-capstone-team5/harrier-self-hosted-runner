import createServiceRole from "../utils/aws/iam/createServiceRole";
import createAndDeployLambda from "../utils/aws/lambda/createAndDeployLambda";
import setupRestApi from "../utils/aws/api/setupRestApi";
import integrateLambdaWithApi from "../utils/aws/api/integrateLambdaWithApi";
import deployApi from "../utils/aws/api/deployApi";
import setupWebhook from "../utils/github/setupWebhook";

import { LambdaName } from "../utils/aws/lambda/types";
import { configHarrier } from "../config/configHarrier";

const lambdaName: LambdaName = "workflow"; // HARDCODED lambda name
const stageName = "dev"; // HARDCODED

export async function setupApiAndWebhook() {
  try {
    const workflowPolicy = {
      name: "workflow-policy", // this would need a name
      document: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "VisualEditor0",
            Effect: "Allow",
            Action: ["ec2:StartInstances", "ec2:StopInstances"],
            Resource: `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
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
              `arn:aws:ec2:*:${configHarrier.awsAccountId}:instance/*`,
              "arn:aws:ssm:*:*:document/AWS-RunShellScript",
              `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*`,
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
              `arn:aws:secretsmanager:*:${configHarrier.awsAccountId}:secret:${configHarrier.secretName}*`,
              `arn:aws:logs:*:${configHarrier.awsAccountId}:log-group:*:log-stream:*`,
            ],
          },
          {
            Sid: "VisualEditor3",
            Effect: "Allow",
            Action: ["ec2:DescribeInstances", "s3:ListAllMyBuckets"],
            Resource: "*",
          },
        ],
      },
    };
    const serviceRoleArn = await createServiceRole(
      configHarrier.workflowLambdaServiceRole,
      JSON.stringify(workflowPolicy)
    );

    await createAndDeployLambda(lambdaName, serviceRoleArn);
    throw new Error("💩💩💩");
    const { restApiId, resourceId } = await setupRestApi();
    await integrateLambdaWithApi(restApiId, resourceId, lambdaName);
    await deployApi(restApiId, stageName);
    await setupWebhook(restApiId, stageName);

    console.log("✅ completed setupApiAndWebhook ");
  } catch (error: unknown) {
    console.error("Error executing setupApiAndWebhook: ", error);
  }
}

void setupApiAndWebhook();
