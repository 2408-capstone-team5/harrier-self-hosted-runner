import { createS3 } from "../utils/aws/s3/createS3";
import { initializeEC2Status } from "../utils/aws/s3/initializeEC2Status";
import { initializeCachePaths } from "../utils/aws/s3/initializeCachePaths";

export const setupS3CacheBucket = async () => {
  try {
    console.log("** Starting setupS3CacheBucket...");

    await createS3();
    await initializeEC2Status();
    await initializeCachePaths();

    console.log("✅ Successfully set up S3.\n");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
    } else {
      throw new Error(`Error setting up S3!`);
    }
  }
};
