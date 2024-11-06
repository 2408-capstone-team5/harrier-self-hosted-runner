import { setupCredentials } from "./services/setupCredentials";
import { setupRoles } from "./services/setupRoles";
import { setupVPC } from "./services/setupVPC";
import { setupS3CacheBucket } from "./services/setupS3CacheBucket";
import { setupEC2Runner } from "./services/setupEC2Runner";
import { setupApiAndWebhook } from "./services/setupApiAndWebhook";
import { setupCacheEviction } from "./services/setupCacheEviction";

export const config = setupCredentials();

const main = () => {
  setupCredentials(); // pull github user's secrets from .env into centralized `config` object
  /* 
    - creating a basic `config` object that is used throughout the app by all aws-clients
    - create unique harrier tag that follows a naming convention: 'harrier-<XXXXXXXX>-resource-name'
    export const config = { user config }
    */
  setupRoles(); // IAM
  /*
    assumes: 
    - harrier_identity user exists with minimum user role permissions

    using the `harrier_identity` user, setup resource-related roles
    - ec2 can access s3
    - lambda basic execution role
    - cache eviction lambda needs s3 access
   */
  setupVPC(); // VPC, IP, Public Subnet, Internet Gateway, Route Table
  /* 
    Create Public Subnet
    Enable auto-assign public IPv4 address with CIDR blocks 10.0.1.0/24
    Create Internet Gateway and Attach to VPC
    Create Route Table and select our VPC
    Edit Routes => Add Route => 0.0.0.0 traffic to harrier gateway
    Associate public subnet with route table

  */
  setupS3CacheBucket(); // S3
  /* 
    - conditionally create and config S3 bucket
  */
  setupEC2Runner(); // EC2-EBS instantiate, run script, stop
  /* 
    - requires: harrier-tagged S3 bucket, existing harrier VPC, existing resource role (granted by harrier_identity)
    - EC2 created with instance-specific configuration details
    - run the script that setups up everything the ec2 needs and invoke `./run.sh`
    - check for status OK
    - stop the instance
    */

  setupApiAndWebhook(); // lambda, api gateway, secrets manager
  /* 
    - requires the PAT from the aws secrets manager

    - create lambda that receives webhook (queued, inprogress, completed) from github workflow run
    - deploy lambda

    - create rest API (resources, methods, integrations, resource policy)
    - register api with api gateway (stages, deployment)
    - setup github webhook with rest api's url as the webhook payload_url
  */
  setupCacheEviction(); // lambda & EventBridge
  /* 
    - requires S3 Name/ARN
    - create lambda with eviction policy
    - register lambda with EventBridge
  */
};

main();
