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
exports.cleanupPrevInstall = void 0;
const cleanupEC2s_1 = require("../utils/aws/cleanup/cleanupEC2s");
const cleanupLambdas_1 = require("../utils/aws/cleanup/cleanupLambdas");
const cleanupApi_1 = require("../utils/aws/cleanup/cleanupApi");
const cleanupIamRoles_1 = require("../utils/aws/cleanup/cleanupIamRoles");
const cleanupS3_1 = require("../utils/aws/cleanup/cleanupS3");
const cleanupVpc_1 = require("../utils/aws/cleanup/cleanupVpc");
// Cleanup function to delete Lambdas, API Gateway REST APIs, and associated IAM roles
const cleanupPrevInstall = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete EC2s, Lambdas, API Gateways, and associated roles with the prefix "Harrier"
        yield (0, cleanupEC2s_1.cleanupEC2s)();
        yield (0, cleanupLambdas_1.cleanupLambdas)();
        yield (0, cleanupApi_1.cleanupApi)();
        yield (0, cleanupIamRoles_1.cleanupIamRoles)();
        yield (0, cleanupS3_1.cleanupS3)();
        yield (0, cleanupVpc_1.cleanupVpc)();
        console.log("Cleanup complete!");
    }
    catch (error) {
        console.error("Error during cleanup:", error);
    }
});
exports.cleanupPrevInstall = cleanupPrevInstall;
