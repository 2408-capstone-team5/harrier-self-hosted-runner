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
function createDailySchedule(scheduleName, lambdaArn, scheduleRoleArn) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a schedule that runs every day at 3AM
        const response = yield client.send(new client_scheduler_1.CreateScheduleCommand({
            Name: scheduleName,
            ScheduleExpression: "cron(0 3 * * ? *)",
            FlexibleTimeWindow: { Mode: "FLEXIBLE", MaximumWindowInMinutes: 15 },
            Target: {
                Arn: lambdaArn,
                RoleArn: scheduleRoleArn,
            },
            State: "ENABLED",
        }));
        if (!response.ScheduleArn) {
            throw new Error(`❌ schedule: ${scheduleName} was not created.`);
        }
        console.log(`✅ schedule ${scheduleName} CREATED`);
    });
}
exports.createDailySchedule = createDailySchedule;
// void createDailySchedule(
//   "cache_test_lambda",
//   "Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"
// );
