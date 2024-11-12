import {
  CreateBucketCommand,
  BucketAlreadyExists,
  BucketAlreadyOwnedByYou,
  waitUntilBucketExists,
  S3Client,
  PutBucketTaggingCommand,
} from "@aws-sdk/client-s3";

export const createS3 = async (
  client: S3Client,
  bucketName: string,
  maxWaitTime: number
) => {
  try {
    const { Location } = await client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      })
    );

    await waitUntilBucketExists(
      { client, maxWaitTime },
      { Bucket: bucketName }
    );

    const putBucketTaggingCommand = new PutBucketTaggingCommand({
      Bucket: bucketName,
      Tagging: {
        TagSet: [{ Key: "Agent", Value: "Harrier-Runner" }],
      },
    });
    const putTagsResponse = await client.send(putBucketTaggingCommand);
    console.log(
      `*** Bucket created with location ${Location} and tags: `,
      putTagsResponse,
      " ***"
    );
  } catch (error: unknown) {
    if (error instanceof BucketAlreadyExists) {
      console.error(
        `The bucket "${bucketName}" already exists in another AWS account. Bucket names must be globally unique.`
      );
    }
    // If you try to create and you already own a bucket in us-east-1 (and only us-east-1)
    // with the same name, the BucketAlreadyOwnedByYou will not be thrown. Instead, the
    // call will return successfully and the ACL on that bucket will be reset.
    else if (error instanceof BucketAlreadyOwnedByYou) {
      console.error(
        `The bucket "${bucketName}" already exists in this AWS account.`
      );
    } else {
      console.error("Error creating bucket: ", error);
    }
  }
};
