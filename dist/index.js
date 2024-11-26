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
const cleanupPrevInstall_1 = require("./services/cleanupPrevInstall");
const setupVPC_1 = require("./services/setupVPC");
const setupS3CacheBucket_1 = require("./services/setupS3CacheBucket");
const setupEC2Runner_1 = require("./services/setupEC2Runner");
const setupApiAndWebhook_1 = require("./services/setupApiAndWebhook");
const setupRoles_1 = require("./services/setupRoles");
const setupCacheEviction_1 = require("./services/setupCacheEviction");
let deleteHarrier = false;
const processCmdLineArgs = () => {
    const args = process.argv.slice(2);
    let clean = false;
    const nameArgIndex = args.indexOf("--clean");
    if (nameArgIndex !== -1) {
        clean = true;
        console.log(`*** Clean Only!***`);
    }
    const options = {
        clean,
    };
    return options;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cmdLineOptions = processCmdLineArgs();
        deleteHarrier = cmdLineOptions.clean;
        yield (0, cleanupPrevInstall_1.cleanupPrevInstall)();
        if (deleteHarrier) {
            console.log("=> Only performing cleanup of previous installation, without installing a new Harrier setup.\n" +
                "✅ Successfully deleted Harrier from AWS account.\n");
            return;
        }
        yield (0, setupRoles_1.setupRoles)(); // IAM
        yield (0, setupVPC_1.setupVPC)();
        yield (0, setupEC2Runner_1.setupEC2Runner)();
        yield (0, setupS3CacheBucket_1.setupS3CacheBucket)(); // S3
        yield (0, setupCacheEviction_1.setupCacheEviction)();
        yield (0, setupApiAndWebhook_1.setupApiAndWebhook)();
    }
    catch (error) {
        console.error("Error executing main in index: ", error);
        throw new Error("❌");
    }
});
void main();
