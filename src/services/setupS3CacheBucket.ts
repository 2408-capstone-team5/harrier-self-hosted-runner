import { createS3 } from "../utils/aws/s3/createS3";
import { initializeS3 } from "../utils/aws/s3/initializeS3";

export const setupS3CacheBucket = async () => {
  try {
    console.log("** Starting setupS3CacheBucket...");

    await createS3();
    await initializeS3();

    console.log("✅ Successfully set up S3.\n");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message, "\n");
    } else {
      throw new Error(`Error setting up S3!`);
    }
  }
};
