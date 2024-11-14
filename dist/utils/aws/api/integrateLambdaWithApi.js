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
exports.integrateLambdaWithApi = void 0;
const grantInvokePermission_1 = require("../iam/grantInvokePermission");
const getLambdaArn_1 = require("../lambda/getLambdaArn");
const createLambdaIntegration_1 = require("./createLambdaIntegration");
function integrateLambdaWithApi(restApiId, resourceId, lambdaName) {
    return __awaiter(this, void 0, void 0, function* () {
        const lambdaArn = yield (0, getLambdaArn_1.getLambdaArn)(lambdaName);
        yield (0, grantInvokePermission_1.grantInvokePermission)(lambdaArn, restApiId); // TODO: ASK JESSE ABOUT S3 CLEANUP LAMBDA PERMISSIONS
        yield (0, createLambdaIntegration_1.createLambdaIntegration)(restApiId, resourceId, lambdaArn);
        console.log("✅ lambda INTEGRATED w/ api ");
    });
}
exports.integrateLambdaWithApi = integrateLambdaWithApi;
