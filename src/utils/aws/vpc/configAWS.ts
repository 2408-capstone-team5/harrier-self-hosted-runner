import { fromIni } from "@aws-sdk/credential-provider-ini";
import { configHarrier } from "../../../config/configHarrier";

// Just hardcode for now
export const configAWS = {
  region: configHarrier.region,
  credentials: fromIni({ profile: "harrier_identity" }), // Need to get this from OICD Github AWS Creds eventually?
};
