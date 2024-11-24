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
exports.createS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const configHarrier_1 = require("../../../config/configHarrier");
const createS3 = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_s3_1.S3Client({ region: configHarrier_1.configHarrier.region });
    const maxWaitTime = 60;
    try {
        const { Location } = yield client.send(new client_s3_1.CreateBucketCommand({
            Bucket: configHarrier_1.configHarrier.s3Name,
        }));
        yield (0, client_s3_1.waitUntilBucketExists)({ client, maxWaitTime }, { Bucket: configHarrier_1.configHarrier.s3Name });
        const putBucketTaggingCommand = new client_s3_1.PutBucketTaggingCommand({
            Bucket: configHarrier_1.configHarrier.s3Name,
            Tagging: {
                TagSet: [{ Key: "Agent", Value: "Harrier-Runner" }],
            },
        });
        yield client.send(putBucketTaggingCommand);
        console.log(`✅ Successfully created S3 Bucket with location ${Location}\n`);
    }
    catch (error) {
        if (error instanceof client_s3_1.BucketAlreadyExists) {
            console.error(`❌ Error: The bucket "${configHarrier_1.configHarrier.s3Name}" already exists in another AWS account - Bucket names must be globally unique.\n`);
        }
        // If you try to create and you already own a bucket in us-east-1 (and only us-east-1)
        // with the same name, the BucketAlreadyOwnedByYou will not be thrown. Instead, the
        // call will return successfully and the ACL on that bucket will be reset.
        else if (error instanceof client_s3_1.BucketAlreadyOwnedByYou) {
            console.error(`❌ Error: The bucket "${configHarrier_1.configHarrier.s3Name}" already exists in this AWS account.\n`);
        }
        else {
            console.error("❌ Error creating bucket: ", error, "\n");
        }
    }
});
exports.createS3 = createS3;
