"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanupPrevInstall_1 = require("./services/cleanupPrevInstall");
const setupVPC_1 = require("./services/setupVPC");
const setupS3CacheBucket_1 = require("./services/setupS3CacheBucket");
const setupEC2Runner_1 = require("./services/setupEC2Runner");
const setupApiAndWebhook_1 = require("./services/setupApiAndWebhook");
const setupRoles_1 = require("./services/setupRoles");
const setupCacheEviction_1 = require("./services/setupCacheEviction");
const getAvailabilityZones_1 = require("./utils/aws/vpc/getAvailabilityZones");
const checkInstanceTypeAvailable_1 = require("./utils/aws/ec2/checkInstanceTypeAvailable");
const configHarrier_1 = require("./config/configHarrier");
const checkInstanceTypeAvailable_2 = require("./utils/aws/ec2/checkInstanceTypeAvailable");
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cmdLineOptions = processCmdLineArgs();
        deleteHarrier = cmdLineOptions.clean;
        yield (0, cleanupPrevInstall_1.cleanupPrevInstall)();
        if (deleteHarrier) {
            console.log("=> Only performing cleanup of previous installation, without installing a new Harrier setup.\n" +
                "✅ Successfully deleted Harrier from AWS account.\n");
            let zones = yield (0, getAvailabilityZones_1.getAvailabilityZones)();
            console.log(zones);
            let instanceType = configHarrier_1.configHarrier.instanceType;
            // instanceType = "hpc6id.32xlarge";  // not in us-east-1
            let isAvailable = false;
            let idx = 0;
            while (!isAvailable && idx < zones.length) {
                isAvailable = yield (0, checkInstanceTypeAvailable_1.isInstanceTypeAvailable)(instanceType, zones[idx]);
                console.log(`${instanceType} availability in ${zones[idx]}:`, isAvailable);
                idx++;
            }
            if (isAvailable) {
                configHarrier_1.configHarrier.availabilityZone = zones[idx - 1];
                console.log(`Set Availability Zone to ${configHarrier_1.configHarrier.availabilityZone}`);
                yield (0, checkInstanceTypeAvailable_2.findComparableInstanceType)(instanceType);
            }
            else {
                console.log(`${instanceType} not found in ${configHarrier_1.configHarrier.region} region.  Searching for comparable instance type to use!`);
                yield (0, checkInstanceTypeAvailable_2.findComparableInstanceType)(instanceType);
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
        yield (0, setupRoles_1.setupRoles)(); // IAM
        yield (0, setupVPC_1.setupVPC)();
        yield (0, setupEC2Runner_1.setupEC2Runner)();
        yield (0, setupS3CacheBucket_1.setupS3CacheBucket)(); // S3
        yield (0, setupCacheEviction_1.setupCacheEviction)();
        yield (0, setupApiAndWebhook_1.setupApiAndWebhook)();
    }
    catch (error) {
        console.error("Error executing main in index: ", error);
        throw new Error("❌");
    }
});
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
