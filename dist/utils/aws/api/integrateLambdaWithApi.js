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
const grantInvokePermission_1 = __importDefault(require("../iam/grantInvokePermission"));
const getLambdaArn_1 = __importDefault(require("../lambda/getLambdaArn"));
const createLambdaIntegration_1 = __importDefault(require("./createLambdaIntegration"));
function integrateLambdaWithApi(restApiId, resourceId, lambdaName) {
    return __awaiter(this, void 0, void 0, function* () {
        const lambdaArn = yield (0, getLambdaArn_1.default)(lambdaName);
        yield (0, grantInvokePermission_1.default)(lambdaArn, restApiId); // ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
        yield (0, createLambdaIntegration_1.default)(restApiId, resourceId, lambdaArn);
        console.log("✅ 'workflow' lambda integrated with rest api resource: POST /workflow");
    });
}
exports.default = integrateLambdaWithApi;
