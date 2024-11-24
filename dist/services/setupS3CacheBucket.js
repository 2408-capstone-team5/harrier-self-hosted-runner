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
const initializeEC2Status_1 = require("../utils/aws/s3/initializeEC2Status");
const initializeCachePaths_1 = require("../utils/aws/s3/initializeCachePaths");
const setupS3CacheBucket = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Starting setupS3CacheBucket...");
        yield (0, createS3_1.createS3)();
        yield (0, initializeEC2Status_1.initializeEC2Status)();
        yield (0, initializeCachePaths_1.initializeCachePaths)();
        console.log("✅ Successfully set up S3.\n");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error:", error.message, "\n");
        }
        else {
            throw new Error(`Error setting up S3!`);
        }
    }
});
exports.setupS3CacheBucket = setupS3CacheBucket;
