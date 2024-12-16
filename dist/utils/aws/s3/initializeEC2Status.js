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
exports.initializeEC2Status = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const configHarrier_1 = require("../../../config/configHarrier");
const initializeEC2Status = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_s3_1.S3Client({ region: configHarrier_1.configHarrier.region });
    const statusObject = {
        status: "offline",
        lastRun: {
        // timeStamp: "",
        // user: "",
        // organization: "",
        // repository: "",
        // branch: "",
        // workflow: "",
        // job: "",
        },
    };
    const statusString = JSON.stringify(statusObject);
    const EC2InstanceIds = configHarrier_1.configHarrier.instanceIds;
    const nextIDObject = {
        nextId: EC2InstanceIds.length,
    };
    const nextIDString = JSON.stringify(nextIDObject);
    try {
        for (const instanceId of EC2InstanceIds) {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: configHarrier_1.configHarrier.s3Name,
                Key: `runner-statuses/${instanceId}.json`,
                Body: statusString,
                ContentType: "application/json",
            });
            yield client.send(command);
        }
        const command = new client_s3_1.PutObjectCommand({
            Bucket: configHarrier_1.configHarrier.s3Name,
            Key: `runner-statuses/nextId.json`,
            Body: nextIDString,
            ContentType: "application/json",
        });
        yield client.send(command);
        console.log(`✅ Successfully initialized S3 with EC2 status "offline".\n`);
    }
    catch (error) {
        throw new Error(`❌ Error initializing S3 with EC2 status: ${error}`);
    }
});
exports.initializeEC2Status = initializeEC2Status;
