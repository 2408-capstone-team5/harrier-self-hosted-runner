"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
// Create an S3 client
const s3Client = new client_s3_1.S3Client({ region: "us-east-1" }); // Change to your region
// Function to find all S3 buckets whose name starts with "Harrier"
const findBucketsWithPrefix = (prefix) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.ListBucketsCommand({});
    const response = yield s3Client.send(command);
    const harrierBuckets = [];
    if (response === null || response === void 0 ? void 0 : response.Buckets) {
        response.Buckets.forEach((bucket) => {
            if ((bucket === null || bucket === void 0 ? void 0 : bucket.Name) && bucket.Name.startsWith(prefix)) {
                harrierBuckets.push(bucket.Name);
            }
        });
    }
    return harrierBuckets;
});
// Function to empty a bucket (delete all objects inside it)
const emptyBucket = (bucketName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // List all objects in the bucket
        const listCommand = new client_s3_1.ListObjectsV2Command({
            Bucket: bucketName,
        });
        const listResponse = yield s3Client.send(listCommand);
        if (listResponse.Contents && listResponse.Contents.length > 0) {
            const deleteParams = {
                Bucket: bucketName,
                Delete: {
                    Objects: listResponse.Contents.map((obj) => ({ Key: obj.Key })),
                },
            };
            // Delete objects in the bucket
            const deleteCommand = new client_s3_1.DeleteObjectsCommand(deleteParams);
            yield s3Client.send(deleteCommand);
            console.log(`   All objects in ${bucketName} have been deleted.`);
        }
        else {
            console.log(`   ${bucketName} is already empty.`);
        }
    }
    catch (error) {
        console.error(`❌ Error emptying bucket ${bucketName}:`, error);
    }
});
// Function to delete a bucket after it's emptied
const deleteBucket = (bucketName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteCommand = new client_s3_1.DeleteBucketCommand({
            Bucket: bucketName,
        });
        yield s3Client.send(deleteCommand);
        console.log(`   Bucket ${bucketName} has been deleted.`);
    }
    catch (error) {
        console.error(`❌ Error deleting bucket ${bucketName}:`, error);
    }
});
// Main function to find, empty, and delete S3 buckets with prefix "Harrier"
const cleanupS3 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Start S3 cleanup");
        const buckets = yield findBucketsWithPrefix("harrier");
        if (buckets.length === 0) {
            console.log('   No buckets found with the prefix "harrier".');
        }
        else {
            for (const bucket of buckets) {
                console.log(`   Processing bucket: ${bucket}`);
                // Empty the bucket first
                yield emptyBucket(bucket);
                // After emptying, delete the bucket
                yield deleteBucket(bucket);
            }
        }
        console.log("✅ Successfully completed S3 cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error in processing S3 buckets:", error, "\n");
    }
});
exports.cleanupS3 = cleanupS3;
