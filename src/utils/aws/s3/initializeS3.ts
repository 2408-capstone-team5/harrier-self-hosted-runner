import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { configHarrier } from "../../../config/configHarrier";

export const initializeS3 = async () => {
  const statusObject = {
    status: "offline",
  };
  const statusString = JSON.stringify(statusObject);

  const starterObject = {
    description: "placeholder",
  };
  const starterString = JSON.stringify(starterObject);

  const EC2InstanceIds = configHarrier.instanceIds;
};
