"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
    - creating a basic `config` object that is used throughout the app by all aws-clients
    export const config = { credentials: }
  */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// import "dotenv/config";
// import { fromEnv } from "@aws-sdk/credential-providers";
exports.config = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    //   credentials: fromEnv(), // Load credentials from environment variables
    region: process.env.AWS_REGION || `us-east-1`,
    //   awsAccountId: process.env.AWS_ACCOUNT_ID,
};
