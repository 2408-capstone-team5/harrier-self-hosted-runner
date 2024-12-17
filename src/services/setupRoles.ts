import {
  createInstanceServiceRole,
  createLambdaServiceRole,
  createSchedulerServiceRole,
} from "../utils/aws/iam/createServiceRole";

import { createInstanceProfile } from "../utils/aws/iam/createInstanceProfile";

import { configHarrier } from "../config/configHarrier";
import {
  workflowLambdaPolicy,
  cacheEvictionLambdaPolicy,
  timeoutLambdaPolicy,
  runnerInstancePolicy,
  eventBridgeSchedulerPolicy,
} from "../config/servicePolicies";

export const setupRoles = async () => {
  const [
    workflowServiceRoleArn,
    cacheEvictionServiceRoleArn,
    timeoutServiceRoleArn,
    runnerInstanceServiceRoleArn,
    schedulerServiceRoleArn,
  ] = await Promise.all([
    createLambdaServiceRole(
      `${configHarrier.workflowServiceName}`,
      workflowLambdaPolicy
    ),
    createLambdaServiceRole(
      `${configHarrier.cacheEvictionServiceName}`,
      cacheEvictionLambdaPolicy
    ),
    createLambdaServiceRole(
      `${configHarrier.timeoutServiceName}`,
      timeoutLambdaPolicy
    ),
    createInstanceServiceRole(
      `${configHarrier.runnerInstanceServiceName}`,
      runnerInstancePolicy
    ),
    createSchedulerServiceRole(
      `${configHarrier.schedulerServiceName}`,
      eventBridgeSchedulerPolicy
    ),
  ]);

  configHarrier.workflowServiceRoleArn = workflowServiceRoleArn;
  configHarrier.cacheEvictionServiceRoleArn = cacheEvictionServiceRoleArn;
  configHarrier.timeoutServiceRoleArn = timeoutServiceRoleArn;
  configHarrier.runnerInstanceServiceRoleArn = runnerInstanceServiceRoleArn;
  configHarrier.schedulerServiceRoleArn = schedulerServiceRoleArn;

  await createInstanceProfile(
    configHarrier.runnerInstanceServiceName,
    configHarrier.runnerInstanceProfileName
  );
};
// export const setupRoles = async () => {
//   configHarrier.workflowServiceRoleArn = await createLambdaServiceRole(
//     `${configHarrier.workflowServiceName}${ROLE_NAME_IDENTIFIER}`,
//     workflowLambdaPolicy
//   );

//   configHarrier.cacheEvictionServiceRoleArn = await createLambdaServiceRole(
//     `${configHarrier.cacheEvictionServiceName}${ROLE_NAME_IDENTIFIER}`,
//     cacheEvictionLambdaPolicy
//   );

//   configHarrier.runnerInstanceServiceRoleArn = await createInstanceServiceRole(
//     `${configHarrier.runnerInstanceServiceName}${ROLE_NAME_IDENTIFIER}`,
//     runnerInstancePolicy
//   );

//   configHarrier.schedulerServiceRoleArn = await createSchedulerServiceRole(
//     `${configHarrier.schedulerServiceName}${ROLE_NAME_IDENTIFIER}`,
//     eventBridgeSchedulerPolicy
//   );
// };
