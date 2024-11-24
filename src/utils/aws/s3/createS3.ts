import {
  CreateBucketCommand,
  BucketAlreadyExists,
  BucketAlreadyOwnedByYou,
  waitUntilBucketExists,
  S3Client,
  PutBucketTaggingCommand,
} from "@aws-sdk/client-s3";
import { configHarrier } from "../../../config/configHarrier";

export const createS3 = async () => {
  const client = new S3Client({ region: configHarrier.region });
  const maxWaitTime = 60;

  try {
    const { Location } = await client.send(
      new CreateBucketCommand({
        Bucket: configHarrier.s3Name,
      })
    );

    await waitUntilBucketExists(
      { client, maxWaitTime },
      { Bucket: configHarrier.s3Name }
    );

    const putBucketTaggingCommand = new PutBucketTaggingCommand({
      Bucket: configHarrier.s3Name,
      Tagging: {
        TagSet: [{ Key: "Agent", Value: "Harrier-Runner" }],
      },
    });
    await client.send(putBucketTaggingCommand);
    // const putTagsResponse = await client.send(putBucketTaggingCommand);
    console.log(
      `✅ Successfully created S3 Bucket with location ${Location}\n`
    );
    // console.log(
    //   `✅ Successfully created S3 Bucket with location ${Location} and tags: `,
    //   putTagsResponse,
    //   "\n"
    // );
  } catch (error: unknown) {
    if (error instanceof BucketAlreadyExists) {
      console.error(
        `❌ Error: The bucket "${configHarrier.s3Name}" already exists in another AWS account - Bucket names must be globally unique.\n`
      );
    }
    // If you try to create and you already own a bucket in us-east-1 (and only us-east-1)
    // with the same name, the BucketAlreadyOwnedByYou will not be thrown. Instead, the
    // call will return successfully and the ACL on that bucket will be reset.
    else if (error instanceof BucketAlreadyOwnedByYou) {
      console.error(
        `❌ Error: The bucket "${configHarrier.s3Name}" already exists in this AWS account.\n`
      );
    } else {
      console.error("❌ Error creating bucket: ", error, "\n");
    }
  }
};
