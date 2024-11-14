declare namespace NodeJS {
  interface ProcessEnv {
    AWS_REGION: string;
    GH_OWNER: string;
    AWS_ACCOUNT_ID: string;
    EC2_INSTANCE_TYPE: string;
    CACHE_TTL_HOURS: string;
    CIDR_BLOCK_VPC: string;
    CIDR_BLOCK_SUBNET: string;
  }
}
