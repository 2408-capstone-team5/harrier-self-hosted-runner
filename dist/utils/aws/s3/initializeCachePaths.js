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
exports.initializeCachePaths = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const configHarrier_1 = require("../../../config/configHarrier");
const initializeCachePaths = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_s3_1.S3Client({ region: configHarrier_1.configHarrier.region });
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
            const command = new client_s3_1.PutObjectCommand({
                Bucket: configHarrier_1.configHarrier.s3Name,
                Key: `${path}/starter.json`,
                Body: jsonString,
                ContentType: "application/json",
            });
            yield client.send(command);
        }
        console.log(`   Successfully initialized S3 with cache paths.\n`);
    }
    catch (error) {
        throw new Error(`❌ Error initializing S3 with cache paths: ${error}`);
    }
});
exports.initializeCachePaths = initializeCachePaths;
