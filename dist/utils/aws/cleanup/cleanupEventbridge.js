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
exports.cleanupEventbridge = void 0;
const client_scheduler_1 = require("@aws-sdk/client-scheduler");
const configHarrier_1 = require("../../../config/configHarrier");
const client = new client_scheduler_1.SchedulerClient({ region: configHarrier_1.configHarrier.region });
const getScheduleByNamePrefix = (prefix) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new client_scheduler_1.ListSchedulesCommand({});
        const response = yield client.send(command);
        const harrierSchedules = (response.Schedules || []).filter((schedule) => { var _a; return (_a = schedule.Name) === null || _a === void 0 ? void 0 : _a.startsWith(prefix); });
        return harrierSchedules;
    }
    catch (error) {
        console.error("❌ Error: ", error, "\n");
        throw new Error("❌ Error finding Harrier Eventbridge schedules!");
    }
});
const deleteSchedules = (schedules) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const schedule of schedules) {
            const scheduleName = schedule.Name;
            console.log("   Deleting schedule: ", scheduleName);
            const deleteParams = { Name: scheduleName };
            const deleteCommand = new client_scheduler_1.DeleteScheduleCommand(deleteParams);
            yield client.send(deleteCommand);
            console.log("   Successfully deleted schedule: ", scheduleName);
        }
    }
    catch (error) {
        console.error("❌ Error deleting Harrier Eventbridge schedules!: ", error, "\n");
    }
});
const cleanupEventbridge = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Start Eventbridge Schedule cleanup");
        // Step 1: Find all Harrier Eventbridge schedules
        const harrierSchedules = yield getScheduleByNamePrefix("harrier");
        if (harrierSchedules.length === 0) {
            console.log("   No schedules to delete.");
        }
        else {
            //Step 2: Delete all Harrier Eventbridge schedules
            yield deleteSchedules(harrierSchedules);
        }
        console.log("✅ Successfully completed Eventbridge Schedule cleanup.\n");
    }
    catch (error) {
        console.error("❌ Error cleaning up Eventbridge Schedules: ", error, "\n");
    }
});
exports.cleanupEventbridge = cleanupEventbridge;
