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
exports.setupCloudwatchLogGroups = void 0;
const createLogGroup_1 = require("../utils/aws/cloudwatch/createLogGroup");
const configHarrier_1 = require("../config/configHarrier");
function setupCloudwatchLogGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logGroupName = configHarrier_1.configHarrier.logGroupName;
            yield (0, createLogGroup_1.createLogGroup)(logGroupName);
            console.log("✅ log group CREATED");
        }
        catch (error) {
            console.error(`❌ log group creation FAILED: ${error}`);
        }
    });
}
exports.setupCloudwatchLogGroups = setupCloudwatchLogGroups;
