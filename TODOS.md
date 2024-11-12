# Harrier Project

```
.
└── src
    ├── config
    ├── scripts
    ├── services
    ├── static
    │   └── zipped_lambdas
    ├── types
    └── utils
        ├── aws
        │   ├── api
        │   │   └── templates
        │   ├── ec2
        │   ├── eventbridge
        │   ├── iam
        │   ├── lambda
        │   ├── s3
        │   └── vpc
        └── github

```
## Immediate:
- [ ] lambda vpc configuration & secretsManager hanging
- [ ] figure out and minimize the permissions of the role (current model: `jesse-aws-config-action-test`) that chad will create
- [ ] figure out what's going on with the shell script being delivered to the ec2, is there an issue with the outbound traffic?  what is occurring that is contributing to the slow down?
- [ ] chad will create the identity provider (IdP) that uses the above role
- [ ] programmatic creation of `cleanup` lambda
- [ ] setup cloudwatch logs (centralized in one logGroup versus on a per-resource-basis)
- [ ] programmatic deletion of all `harrier-XXXXXXXX` tagged resources

- [ ] programmatically create the joel-test role that the `workflow` lambda will assume (hard-coded currently)

## Refactor:

- [ ] http vs rest api (do we refactor or keep as-is?)
- [ ] add resource policy for api
- [ ] put `awsAccountId` and `region` into `configHarrier`
- [ ] refactor `configHarrier` and identify what is a chad-input and what is setup by harrier setup


## Global Configuration information

## Services

### setupRoles

- [x] create: `workflow` lambda
  - [ ] CreateNetworkInterface on EC2
  - [ ] InvalidParameterValueException: Dual stack cannot be supported on at least one of the subnets
  - [ ] ADD condition inside the ec2 policy in `create_workflow_lambdaRoleWithPolicies`
  - [ ]
- [ ] create: jesse `cleanup` lambda `arn:aws:iam::536697269866:role/service-role/s3CacheCleanupLambda-role-zp58dx91`
- [ ] create: jesse scheduler role `"Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"`
- [ ] other roles...

### setupVPC

- [ ] programmatically create security groups

?

### setupS3CacheBucket

- [x] s3 cache bucket created

### setupEC2Runner

?

### setupApiAndWebhook
- [ ] programmatically configure log groups
- [x] create and deploy `workflow` lambda
- [x] integrate with shane's vpc
- [x] create rest api
- [ ] create resource policy on the rest api (limit to github webhook ip ranges)
- [x] integrate `workflow` lambda with rest api
- [x] deploy api (this still needs some reliable status check)
- [x] setup webhook on user's github 
- [x] stop using the `config/client` for the aws-sdk clients
- [ ] remove all hardcoded values and centralize them in a config file
- [ ] long polling (?) to ensure that resources exist "enough" to integrate various values

### setupCacheEviction

- [x] scheduler created
- [x] test lambda created
- [ ] tie lambda-s3-eventbridge together for cache eviction
