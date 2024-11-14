"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulerTrustPolicy = exports.instanceTrustPolicy = exports.lambdaTrustPolicy = void 0;
const configHarrier_1 = require("./configHarrier");
exports.lambdaTrustPolicy = JSON.stringify({
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
exports.instanceTrustPolicy = JSON.stringify({
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
const awsAccountId = configHarrier_1.configHarrier.awsAccountId;
exports.schedulerTrustPolicy = JSON.stringify({
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
