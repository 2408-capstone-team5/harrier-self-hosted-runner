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
exports.createDailySchedule = void 0;
const configHarrier_1 = require("../../../config/configHarrier");
const client_scheduler_1 = require("@aws-sdk/client-scheduler"); // ES Modules import
const client = new client_scheduler_1.SchedulerClient({ region: configHarrier_1.configHarrier.region });
function createDailySchedule(scheduleName, lambdaArn, scheduleRole) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a rule that runs every day at 3AM
            const input = {
                Name: scheduleName,
                ScheduleExpression: "cron(0 3 * * ? *)",
                FlexibleTimeWindow: { Mode: "FLEXIBLE", MaximumWindowInMinutes: 15 },
                Target: {
                    // Target
                    Arn: lambdaArn,
                    RoleArn: `arn:aws:iam::${configHarrier_1.configHarrier.awsAccountId}:role/service-role/${scheduleRole}`,
                    // we need the arn of an iam role which gives to the scheduler to access the cleanup lambda, I'm using a manually (console) created role here
                },
                State: "ENABLED",
            };
            const command = new client_scheduler_1.CreateScheduleCommand(input);
            const response = yield client.send(command);
            console.log("Schedule ARN:", response.ScheduleArn);
            console.log("schedule response is: ", response);
            if (!response.ScheduleArn) {
                throw new Error(`The schedule with ARN ${scheduleName} was not created.`);
            }
            return `scheduleArn is: ${response.ScheduleArn}`;
        }
        catch (error) {
            console.error("Error creating schedule:", error);
            throw new Error("createSchedule failed");
        }
    });
}
exports.createDailySchedule = createDailySchedule;
// void createDailySchedule(
//   "cache_test_lambda",
//   "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"
// );
