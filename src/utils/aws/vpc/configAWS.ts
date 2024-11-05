import { fromIni } from "@aws-sdk/credential-provider-ini";

// Just hardcode for now
export const configAWS = {
  region: "us-east-1",
  credentials: fromIni({ profile: "harrier_identity" }), // Need to get this from setupCredentials eventually?
};
