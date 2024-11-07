"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
    - creating a basic `config` object that is used throughout the app by all aws-clients
    export const config = { credentials: }
  */
exports.__esModule = true;
exports.config = void 0;
require("dotenv/config");
var credential_providers_1 = require("@aws-sdk/credential-providers");
exports.config = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    credentials: (0, credential_providers_1.fromEnv)(),
    region: process.env.AWS_REGION,
    awsAccountId: process.env.AWS_ACCOUNT_ID
};
