import { cleanupPrevInstall } from "./services/cleanupPrevInstall";
import { setupVPC } from "./services/setupVPC";
import { setupS3CacheBucket } from "./services/setupS3CacheBucket";
import { setupEC2Runner } from "./services/setupEC2Runner";
import { setupApiAndWebhook } from "./services/setupApiAndWebhook";
import { setupRoles } from "./services/setupRoles";
import { setupCacheEviction } from "./services/setupCacheEviction";
import { getAvailabilityZones } from "./utils/aws/vpc/getAvailabilityZones";
import { isInstanceTypeAvailable } from "./utils/aws/ec2/checkInstanceTypeAvailable";
import { configHarrier } from "./config/configHarrier";
import { findComparableInstanceType } from "./utils/aws/ec2/checkInstanceTypeAvailable";

let deleteHarrier = false;

const processCmdLineArgs = () => {
  const args = process.argv.slice(2);
  let clean = false;

  const nameArgIndex = args.indexOf("--clean");
  if (nameArgIndex !== -1) {
    clean = true;
    console.log(`*** Clean Only!***`);
  }

  const options = {
    clean,
  };
  return options;
};

const main = async () => {
  try {
    const cmdLineOptions = processCmdLineArgs();
    deleteHarrier = cmdLineOptions.clean;

    await cleanupPrevInstall();

    if (deleteHarrier) {
      console.log(
        "=> Only performing cleanup of previous installation, without installing a new Harrier setup.\n" +
          "✅ Successfully deleted Harrier from AWS account.\n"
      );

      let zones = await getAvailabilityZones();
      console.log(zones);

      let instanceType = configHarrier.instanceType;
      // instanceType = "hpc6id.32xlarge";  // not in us-east-1

      let isAvailable = false;
      let idx = 0;

      while (!isAvailable && idx < zones.length) {
        isAvailable = await isInstanceTypeAvailable(instanceType, zones[idx]);
        console.log(`${instanceType} availability in ${zones[idx]}:`, isAvailable);
        idx++;
      }

      if (isAvailable) {
        configHarrier.availabilityZone = zones[idx - 1];
        console.log(`Set Availability Zone to ${configHarrier.availabilityZone}`);
        await findComparableInstanceType(instanceType)
      } else {
        console.log(`${instanceType} not found in ${configHarrier.region} region.  Searching for comparable instance type to use!`);
        await findComparableInstanceType(instanceType)
        // const newInstanceType = await findComparableInstanceType(instanceType);
        // if (newInstanceType) {
        //   configHarrier.instanceType = instanceType;
        //   console.log(`Using `);
        // } else {
        //   throw new Error(`Instance Type ${instanceType} not availabile in ${configHarrier.region} and no comparable instances found!`);
        // }
      }
      return;
    }

    await setupRoles(); // IAM

    await setupVPC();

    await setupEC2Runner();

    await setupS3CacheBucket(); // S3

    await setupCacheEviction();

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
