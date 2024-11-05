import { configHarrierType } from "../types/typesConfig";
import { installationHash } from "./installationHash";

export const configHarrier: configHarrierType = {
  tagValue: `Harrier-${installationHash}`,
  cidrBlockVPC: "10.0.0.0/16",
  cidrBlockSubnet: "10.0.0.0/24",
  vpcId: "",
};
