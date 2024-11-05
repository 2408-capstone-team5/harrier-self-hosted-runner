/* 
    - creating a basic `config` object that is used throughout the app by all aws-clients
    - create unique harrier tag that follows a naming convention: 'harrier-<XXXXXXXX>-resource-name'
    export const config = { user config }
  */

import "dotenv/config";

import { fromEnv } from "@aws-sdk/credential-providers";

export const config = {
  credentials: fromEnv(), // Load credentials from environment variables
  region: "us-east-1",
};
