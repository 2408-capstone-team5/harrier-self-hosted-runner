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

## Global Configuration information

## Services

### setupRoles

- [x] create: `workflow` lambda `arn:aws:iam::${config.awsAccountId}:role/service-role/harrier-lambda-role-br4dh2zf` (last part is actually `roleName` rn)
- [ ] create: jesse `cleanup` lambda `arn:aws:iam::536697269866:role/service-role/s3CacheCleanupLambda-role-zp58dx91`
- [ ] create: jesse scheduler role `"Amazon_EventBridge_Scheduler_LAMBDA_da0ae2eeec"`
- [ ] other roles...

### setupVPC

?

### setupS3CacheBucket

- [x] s3 cache bucket created

### setupEC2Runner

?

### setupApiAndWebhook

- [x] create and deploy lambda
- [ ] integrate with shane's vpc
- [x] create rest api
- [ ] create resource policy on the rest api (limit to github webhook ip ranges)
- [x] integrate `workflow` lambda with rest api
- [x] deploy api
- [x] setup webhook

### setupCacheEviction

- [x] scheduler created
- [x] test lambda created
- [ ] tie lambda-s3-eventbridge together for cache eviction
