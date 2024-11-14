/*
    assumes: 
    - harrier_identity user exists with minimum user role permissions

    using the `harrier_identity` user, setup resource-related roles
    - ec2 can access s3
    - lambda basic execution role
    - cache eviction lambda needs s3 access
   */

// import {
//   createInstanceServiceRole,
//   createLambdaServiceRole,
//   createSchedulerServiceRole,
// } from "../utils/aws/iam/createServiceRole";

// import { configHarrier } from "../config/configHarrier";

export const setupRoles = async () => {};

//   workflowServiceRoleArn: "",
//   cacheEvictionServiceRoleArn: "",
//   runnerInstanceServiceRoleArn: "",
//   eventBridgeServiceRoleArn: "",

// const workflowServiceRole = `${configHarrier.tagValue}-workflow-service-role`;
