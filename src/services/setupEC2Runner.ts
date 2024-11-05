/* 
    - requires: harrier-tagged S3 bucket, existing harrier VPC, existing resource role (granted by harrier_identity)
    - EC2 created with instance-specific configuration details
    - run the script that setups up everything the ec2 needs and invoke `./run.sh`
    - check for status OK
    - stop the instance
    */

import { createEC2 } from "../utils/aws/ec2/createEC2";
import { getStartScript } from "../../../scripts/setup";

// const userDataScript = startScript;
const userDataScript = getStartScript(url);
console.log(userDataScript);
console.log(instanceType);

// Encode the script in base64 as required by AWS
const userData = Buffer.from(userDataScript).toString("base64");

export const setupEC2Runner = () => {};
