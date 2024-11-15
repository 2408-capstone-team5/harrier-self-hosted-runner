import { cleanupEC2s } from "../utils/aws/cleanup/cleanupEC2s";
import { cleanupLambdas } from "../utils/aws/cleanup/cleanupLambdas";
import { cleanupApi } from "../utils/aws/cleanup/cleanupApi";
import { cleanupIamRoles } from "../utils/aws/cleanup/cleanupIamRoles";
import { cleanupS3 } from "../utils/aws/cleanup/cleanupS3";
import { cleanupVpc } from "../utils/aws/cleanup/cleanupVpc";

// Cleanup function to delete Lambdas, API Gateway REST APIs, and associated IAM roles
export const cleanupPrevInstall = async () => {
  try {
    // Delete EC2s, Lambdas, API Gateways, and associated roles with the prefix "Harrier"
    await cleanupEC2s();
    await cleanupLambdas();
    await cleanupApi();
    await cleanupIamRoles();
    await cleanupS3();
    await cleanupVpc();

    console.log("✅ Harrier Cleanup complete.\n");
  } catch (error) {
    console.error("❌ Error during cleanup:", error, "\n");
  }
};
