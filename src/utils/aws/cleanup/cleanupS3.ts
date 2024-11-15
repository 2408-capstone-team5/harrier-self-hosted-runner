import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";

// Create an S3 client
const s3Client = new S3Client({ region: "us-east-1" }); // Change to your region

// Function to find all S3 buckets whose name starts with "Harrier"
const findBucketsWithPrefix = async (prefix: string) => {
  const command = new ListBucketsCommand({});
  const response = await s3Client.send(command);

  const harrierBuckets: string[] = [];

  if (response?.Buckets) {
    response.Buckets.forEach((bucket) => {
      if (bucket?.Name && bucket.Name.startsWith(prefix)) {
        harrierBuckets.push(bucket.Name);
      }
    });
  }

  return harrierBuckets;
};

// Function to empty a bucket (delete all objects inside it)
const emptyBucket = async (bucketName: string) => {
  try {
    // List all objects in the bucket
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const listResponse = await s3Client.send(listCommand);

    if (listResponse.Contents && listResponse.Contents.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: listResponse.Contents.map((obj) => ({ Key: obj.Key })),
        },
      };

      // Delete objects in the bucket
      const deleteCommand = new DeleteObjectsCommand(deleteParams);
      await s3Client.send(deleteCommand);
      console.log(`   All objects in ${bucketName} have been deleted.`);
    } else {
      console.log(`   ${bucketName} is already empty.`);
    }
  } catch (error) {
    console.error(`❌ Error emptying bucket ${bucketName}:`, error);
  }
};

// Function to delete a bucket after it's emptied
const deleteBucket = async (bucketName: string) => {
  try {
    const deleteCommand = new DeleteBucketCommand({
      Bucket: bucketName,
    });
    await s3Client.send(deleteCommand);
    console.log(`   Bucket ${bucketName} has been deleted.`);
  } catch (error) {
    console.error(`❌ Error deleting bucket ${bucketName}:`, error);
  }
};

// Main function to find, empty, and delete S3 buckets with prefix "Harrier"
export const cleanupS3 = async () => {
  try {
    console.log("** Start S3 cleanup");

    const buckets = await findBucketsWithPrefix("harrier");
    if (buckets.length === 0) {
      console.log('   No buckets found with the prefix "harrier".');
    } else {
      for (const bucket of buckets) {
        console.log(`   Processing bucket: ${bucket}`);

        // Empty the bucket first
        await emptyBucket(bucket);

        // After emptying, delete the bucket
        await deleteBucket(bucket);
      }
    }

    console.log("✅ Successfully completed S3 cleanup.\n");
  } catch (error) {
    console.error("❌ Error in processing S3 buckets:", error, "\n");
  }
};
