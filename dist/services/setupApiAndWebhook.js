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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApiAndWebhook = void 0;
// import createWorkflowLambdaServiceRole from "../utils/aws/iam/createWorkflowLambdaServiceRole";
const createAndDeployLambda_1 = __importDefault(require("../utils/aws/lambda/createAndDeployLambda"));
const setupRestApi_1 = __importDefault(require("../utils/aws/api/setupRestApi"));
const integrateLambdaWithApi_1 = __importDefault(require("../utils/aws/api/integrateLambdaWithApi"));
const deployApi_1 = __importDefault(require("../utils/aws/api/deployApi"));
const setupWebhook_1 = __importDefault(require("../utils/github/setupWebhook"));
const lambdaName = "workflow"; // HARDCODED lambda name
const stageName = "dev"; // HARDCODED
function setupApiAndWebhook() {
    return __awaiter(this, void 0, void 0, function* () {
        //   const wait = (ms: number) => {
        //     console.log(`waiting ${ms / 1000} seconds...`);
        //     const start = Date.now();
        //     let now = start;
        //     while (now - start < ms) {
        //       now = Date.now();
        //     }
        //   };
        try {
            // const roleName = "_";
            const serviceRoleArn = "arn:aws:iam::536697269866:role/service-role/joel_test-role-927gtd4h"; //await createWorkflowLambdaServiceRole(roleName);
            yield (0, createAndDeployLambda_1.default)(lambdaName, serviceRoleArn);
            const { restApiId, resourceId } = yield (0, setupRestApi_1.default)();
            yield (0, integrateLambdaWithApi_1.default)(restApiId, resourceId, lambdaName);
            yield (0, deployApi_1.default)(restApiId, stageName);
            yield (0, setupWebhook_1.default)(restApiId, stageName);
            console.log("✅ completed setupApiAndWebhook ");
        }
        catch (error) {
            console.error("Error executing setupApiAndWebhook: ", error);
        }
    });
}
exports.setupApiAndWebhook = setupApiAndWebhook;
void setupApiAndWebhook();
