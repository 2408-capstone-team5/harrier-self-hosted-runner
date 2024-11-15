import { createS3 } from "../utils/aws/s3/createS3";
import { S3Client } from "@aws-sdk/client-s3";
import { configHarrier } from "../config/configHarrier";

const client = new S3Client({ region: configHarrier.region });
const maxWaitTime = 60;

export const setupS3CacheBucket = async () => {
  const bucketName = `${configHarrier.s3Name}`;
  console.log("** Starting setupS3CacheBucket...");
  await createS3(client, bucketName, maxWaitTime);
};
