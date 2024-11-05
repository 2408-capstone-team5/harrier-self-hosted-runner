"use strict";
exports.__esModule = true;
exports.configHarrier = void 0;
var installationHash_1 = require("./installationHash");
exports.configHarrier = {
    tagValue: "Harrier-".concat(installationHash_1.installationHash),
    cidrBlockVPC: "10.0.0.0/16",
    cidrBlockSubnet: "10.0.0.0/24",
    vpcId: "",
    subnetId: "",
    region: "us-east-1",
    awsAccountId: "536697269866",
    imageId: "ami-0866a3c8686eaeeba",
    instanceType: "t2.micro",
    keyName: "test-1-ubuntu-64x86-241022",
    minInstanceCount: 1,
    maxInstanceCount: 1,
    IamInstanceProfile: {
        Name: "EC2-access-S3"
    }
};
