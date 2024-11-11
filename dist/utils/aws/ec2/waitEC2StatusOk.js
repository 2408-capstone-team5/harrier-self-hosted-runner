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
exports.waitEC2StatusOk = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const MAX_WAITER_TIME_IN_SECONDS = 60 * 8;
const waitEC2StatusOk = (instanceId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_ec2_1.EC2Client({ region: "us-east-1" });
    try {
        console.log("Polling `DescribeInstanceStatus` until STATUS OK...");
        const startTime = new Date();
        yield (0, client_ec2_1.waitUntilInstanceStatusOk)({
            client: client,
            maxWaitTime: MAX_WAITER_TIME_IN_SECONDS,
        }, { InstanceIds: [instanceId] });
        const endTime = new Date();
        console.log("*** STATUS OK Succeeded after time: ", (endTime.getTime() - startTime.getTime()) / 1000);
    }
    catch (caught) {
        if (caught instanceof Error && caught.name === "TimeoutError") {
            caught.message = `${caught.message}. Try increasing the maxWaitTime in the waiter.`;
        }
        console.error(caught);
    }
});
exports.waitEC2StatusOk = waitEC2StatusOk;
