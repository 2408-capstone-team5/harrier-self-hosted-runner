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
exports.setupS3CacheBucket = void 0;
const createS3_1 = require("../utils/aws/s3/createS3");
const client_s3_1 = require("@aws-sdk/client-s3");
const configHarrier_1 = require("../config/configHarrier");
const client = new client_s3_1.S3Client({ region: configHarrier_1.configHarrier.region });
const maxWaitTime = 60;
const setupS3CacheBucket = () => __awaiter(void 0, void 0, void 0, function* () {
    const bucketName = `${configHarrier_1.configHarrier.s3Name}`;
    console.log("** Starting setupS3CacheBucket...");
    yield (0, createS3_1.createS3)(client, bucketName, maxWaitTime);
});
exports.setupS3CacheBucket = setupS3CacheBucket;
