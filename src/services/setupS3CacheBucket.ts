// import { config } from "../config/client";
import { createS3 } from "../utils/aws/s3/createS3";
import { installationHash } from "../config/installationHash";
import { S3Client } from "@aws-sdk/client-s3";
import { configHarrier } from "../config/configHarrier.js";

const client = new S3Client({ region: "us-east-1" });
const maxWaitTime = 60;

export const setupS3CacheBucket = async () => {
  const bucketName = `harrier-${installationHash}-s3`;
  configHarrier.s3Name = bucketName;
  await createS3(client, bucketName, maxWaitTime);
};
