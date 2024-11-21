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
exports.setupEC2Runner = void 0;
const createSecurityGroup_1 = require("../utils/aws/ec2/createSecurityGroup");
const addSecurityGroupRules_1 = require("../utils/aws/ec2/addSecurityGroupRules");
const createEC2_1 = require("../utils/aws/ec2/createEC2");
const waitEC2StatusOk_1 = require("../utils/aws/ec2/waitEC2StatusOk");
// import { describeEC2s } from "../utils/aws/ec2/describeEC2Instances";
const stopEC2_1 = require("../utils/aws/ec2/stopEC2");
const wait = (ms) => {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
        now = Date.now();
    }
};
const setupEC2Runner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("** Starting setupEC2Runner...");
        yield (0, createSecurityGroup_1.createSecurityGroup)();
        yield (0, addSecurityGroupRules_1.addSecurityGroupRules)();
        const instanceId = yield (0, createEC2_1.createEC2)();
        wait(500);
        // await describeEC2s(instanceId);
        yield (0, waitEC2StatusOk_1.waitEC2StatusOk)(instanceId);
        yield (0, stopEC2_1.stopInstance)(instanceId);
        console.log("✅ Successfully set up EC2.\n");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("❌ Error:", error.message, "\n");
        }
        else {
            throw new Error(`Error setting up EC2!`);
        }
    }
});
exports.setupEC2Runner = setupEC2Runner;
