/* 
- conditionally create and config S3 bucket
*/

import { config } from "../config/client";
import { createS3 } from "../utils/aws/s3/createS3";
import { installationHash } from "../config/installationHash";
import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client(config);
const maxWaitTime = 60;

export const setupS3CacheBucket = () => {
  const bucketName = `harrier-${installationHash}-S3`;
  void createS3(client, bucketName, maxWaitTime);
};
