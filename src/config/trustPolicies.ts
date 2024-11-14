import { configHarrier } from "./configHarrier";

export const lambdaTrustPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "lambda.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
});

export const instanceTrustPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "ec2.amazonaws.com",
      },
      Action: "sts:AssumeRole",
    },
  ],
});

const awsAccountId = configHarrier.awsAccountId;

export const schedulerTrustPolicy = JSON.stringify({
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Service: "scheduler.amazonaws.com",
      },
      Action: "sts:AssumeRole",
      Condition: {
        StringEquals: {
          "aws:SourceAccount": `${awsAccountId}`,
        },
      },
    },
  ],
});
