"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configAWS = void 0;
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const configHarrier_1 = require("../../../config/configHarrier");
// Just hardcode for now
exports.configAWS = {
    region: configHarrier_1.configHarrier.region,
    credentials: (0, credential_provider_ini_1.fromIni)({ profile: "harrier_identity" }), // Need to get this from OICD Github AWS Creds eventually?
};
