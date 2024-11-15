import {
  createInstanceServiceRole,
  createLambdaServiceRole,
  createSchedulerServiceRole,
} from "../utils/aws/iam/createServiceRole";

import { configHarrier } from "../config/configHarrier";
import {
  workflowLambdaPolicy,
  cacheEvictionLambdaPolicy,
  runnerInstancePolicy,
  eventBridgeSchedulerPolicy,
} from "../config/servicePolicies";

const ROLE_NAME_IDENTIFIER = "-service-role";

export const setupRoles = async () => {
  configHarrier.workflowServiceRoleArn = await createLambdaServiceRole(
    `${configHarrier.workflowServiceName}${ROLE_NAME_IDENTIFIER}`,
    workflowLambdaPolicy
  );

  configHarrier.cacheEvictionServiceRoleArn = await createLambdaServiceRole(
    `${configHarrier.cacheEvictionServiceName}${ROLE_NAME_IDENTIFIER}`,
    cacheEvictionLambdaPolicy
  );

  configHarrier.runnerInstanceServiceRoleArn = await createInstanceServiceRole(
    `${configHarrier.runnerInstanceServiceName}${ROLE_NAME_IDENTIFIER}`,
    runnerInstancePolicy
  );

  configHarrier.schedulerServiceRoleArn = await createSchedulerServiceRole(
    `${configHarrier.schedulerServiceName}${ROLE_NAME_IDENTIFIER}`,
    eventBridgeSchedulerPolicy
  );
};
