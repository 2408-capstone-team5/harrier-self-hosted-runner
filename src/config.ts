// temporary config file for testing
import { fromIni } from "@aws-sdk/credential-provider-ini";

export const config = {
  // this will be `config` in the final implementation
  region: "us-east-1",
  credentials: fromIni({ profile: "harrier_identity" }),
};
