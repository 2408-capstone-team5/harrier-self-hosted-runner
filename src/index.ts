import { cleanupPrevInstall } from "./services/cleanupPrevInstall";
import { setupVPC } from "./services/setupVPC";
import { setupS3CacheBucket } from "./services/setupS3CacheBucket";
import { setupEC2Runner } from "./services/setupEC2Runner";
import { setupApiAndWebhook } from "./services/setupApiAndWebhook";
import { setupRoles } from "./services/setupRoles";
import { setupCacheEviction } from "./services/setupCacheEviction";

const deleteHarrier = false;

const main = async () => {
  try {
    await cleanupPrevInstall();

    if (deleteHarrier) {
      console.log(
        "=> Only performing cleanup of previous installation, without installing a new Harrier setup.\n" +
          "✅ Successfully deleted Harrier from AWS account.\n"
      );
      return;
    }

    await setupRoles(); // IAM

    await setupVPC();

    await setupS3CacheBucket(); // S3

    await setupCacheEviction();

    await setupEC2Runner();

    await setupApiAndWebhook();
  } catch (error) {
    console.error("Error executing main in index: ", error);
    throw new Error("❌");
  }
};

void main();

// await setupZippedLambdas(); // zip lambdas

// setupCloudWatch(); // for log groups for at least the lambda & rest api
/*
    assumes: 
    - harrier_identity user exists with minimum user role permissions

    using the `harrier_identity` user, setup resource-related roles
    - ec2 can access s3
    - lambda basic execution role
    - cache eviction lambda needs s3 access
   */

// VPC, IP, Public Subnet, Internet Gateway, Route Table
// EC2-EBS instantiate, run script, stop

// lambda, api gateway, secrets manager
/*
    - requires the PAT from the aws secrets manager

    - create lambda that receives webhook (queued, inprogress, completed) from github workflow run
    - deploy lambda

    - create rest API (resources, methods, integrations, resource policy)
    - register api with api gateway (stages, deployment)
    - setup github webhook with rest api's url as the webhook payload_url
  */

// await setupCacheEviction(); // lambda & EventBridge
/* 
    - requires S3 Name/ARN
    - create lambda with eviction policy
    - register lambda with EventBridge
  */
