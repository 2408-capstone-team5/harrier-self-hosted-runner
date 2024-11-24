import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { configHarrier } from "../../../config/configHarrier";

export const initializeCachePaths = async () => {
  const client = new S3Client({ region: configHarrier.region });

  const starterObject = {
    description: "placeholder",
  };
  const jsonString = JSON.stringify(starterObject);

  const cachePaths = [
    "node_modules_cache_key",
    "node_modules_cached_tar",
    "npm_cache",
  ];

  try {
    for (const path of cachePaths) {
      const command = new PutObjectCommand({
        Bucket: configHarrier.s3Name,
        Key: `${path}/starter.json`,
        Body: jsonString,
        ContentType: "application/json",
      });

      await client.send(command);
    }

    console.log(`   Successfully initialized S3 with cache paths.\n`);
  } catch (error) {
    throw new Error(`❌ Error initializing S3 with cache paths: ${error}`);
  }
};
