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
exports.createLogGroup = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const configHarrier_1 = require("../../../config/configHarrier");
function createLogGroup(logGroupName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cloudWatchLogsClient = new client_cloudwatch_logs_1.CloudWatchLogsClient({
                region: configHarrier_1.configHarrier.region,
            });
            yield cloudWatchLogsClient.send(new client_cloudwatch_logs_1.CreateLogGroupCommand({
                logGroupName,
                tags: {
                    Name: configHarrier_1.configHarrier.tagValue,
                },
            }));
            console.log(`✅ Log group: ${logGroupName} created successfully.`);
        }
        catch (error) {
            console.error(`❌ Error creating log group:`, error);
        }
    });
}
exports.createLogGroup = createLogGroup;
