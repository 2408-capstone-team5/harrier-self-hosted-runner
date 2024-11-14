"use strict";
/*
    assumes:
    - harrier_identity user exists with minimum user role permissions

    using the `harrier_identity` user, setup resource-related roles
    - ec2 can access s3
    - lambda basic execution role
    - cache eviction lambda needs s3 access
   */
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
exports.setupRoles = void 0;
// import {
//   createInstanceServiceRole,
//   createLambdaServiceRole,
//   createSchedulerServiceRole,
// } from "../utils/aws/iam/createServiceRole";
// import { configHarrier } from "../config/configHarrier";
const setupRoles = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.setupRoles = setupRoles;
//   workflowServiceRoleArn: "",
//   cacheEvictionServiceRoleArn: "",
//   runnerInstanceServiceRoleArn: "",
//   eventBridgeServiceRoleArn: "",
// const workflowServiceRole = `${configHarrier.tagValue}-workflow-service-role`;
