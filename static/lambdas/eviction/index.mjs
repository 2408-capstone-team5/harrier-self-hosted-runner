import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({});
const BUCKET_NAME_KEYWORD = process.env.BUCKET;
const FOLDER_KEYWORD = "blobs";
const TIME_LIMIT_HOURS = process.env.TTL;

const deleteFromS3 = async (deleteObjectsCommand) => {
  try {
    return await s3Client.send(deleteObjectsCommand);
  } catch (error) {
    console.error("Error deleting items from S3 in eviction lambda:", error);
    throw error;
  }
};

const isOlderThanTimeLimit = (lastModified, timeLimit) =>
  lastModified && lastModified < timeLimit;

export const handler = async () => {
  try {
    const now = new Date();
    const timeLimit = new Date(
      now.getTime() - TIME_LIMIT_HOURS * 60 * 60 * 1000
    );

    const allBuckets = await s3Client.send(new ListBucketsCommand({}));
    const targetBuckets = allBuckets.Buckets?.filter(
      (bucket) => bucket.Name && bucket.Name.includes(BUCKET_NAME_KEYWORD)
    );

    if (!targetBuckets || targetBuckets.length === 0) {
      console.log(
        `No buckets found with name containing "${BUCKET_NAME_KEYWORD}"`
      );
      return;
    }

    for (const { Name: bucketName } of targetBuckets) {
      console.log(`Checking bucket: ${bucketName}`);

      const listedObjects = await s3Client.send(
        new ListObjectsV2Command({ Bucket: bucketName })
      );
      const itemsToDelete = listedObjects.Contents?.filter(
        (item) =>
          item.Key &&
          isOlderThanTimeLimit(item.LastModified, timeLimit) &&
          item.Key.includes(FOLDER_KEYWORD)
      ).map((item) => ({ Key: item.Key }));

      if (itemsToDelete && itemsToDelete.length > 0) {
        const deleteParams = {
          Bucket: bucketName,
          Delete: { Objects: itemsToDelete },
        };
        const deleteObjectsOutput = await deleteFromS3(
          new DeleteObjectsCommand(deleteParams)
        );

        console.log("Delete operation output:", deleteObjectsOutput);
        if (deleteObjectsOutput.Errors) {
          console.log(
            `Unable to delete ${itemsToDelete.length} items from ${bucketName} due to missing permissions`
          );
        } else {
          console.log(
            `Deleted ${itemsToDelete.length} items from ${bucketName}`
          );
        }
      } else {
        console.log(
          `No items to delete in ${bucketName} matching folder keyword "${FOLDER_KEYWORD}"`
        );
      }
    }
  } catch (error) {
    console.error("Error during cleanup process:", error);
  }
};
