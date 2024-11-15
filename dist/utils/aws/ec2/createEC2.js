"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEC2 = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
const configHarrier_1 = require("../../../config/configHarrier");
const setup_1 = require("../../../scripts/setup");
const createEC2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_ec2_1.EC2Client({ region: configHarrier_1.configHarrier.region });
    const amiId = configHarrier_1.configHarrier.imageId;
    const instanceType = configHarrier_1.configHarrier.instanceType === "m7a.medium"
        ? configHarrier_1.configHarrier.instanceType
        : "t2.micro";
    const keyName = configHarrier_1.configHarrier.keyName;
    const minCount = configHarrier_1.configHarrier.minInstanceCount;
    const maxCount = configHarrier_1.configHarrier.maxInstanceCount;
    const securityGroupIds = configHarrier_1.configHarrier.securityGroupIds;
    const subnetId = configHarrier_1.configHarrier.subnetId;
    const iamInstanceProfile = configHarrier_1.configHarrier.IamInstanceProfile;
    const tagSpecifications = [
        {
            ResourceType: "instance",
            Tags: [
                { Key: "Name", Value: `${configHarrier_1.configHarrier.tagValue}-ec2` },
                { Key: "Agent", Value: "Harrier-Runner" },
            ],
        },
    ];
    // const userDataScript = startScript;
    const userDataScript = (0, setup_1.getStartScript)();
    console.log(userDataScript);
    // Encode the script in base64 as required by AWS
    const userData = Buffer.from(userDataScript).toString("base64");
    const params = {
        ImageId: amiId,
        InstanceType: instanceType,
        KeyName: keyName,
        MinCount: minCount,
        MaxCount: maxCount,
        SecurityGroupIds: securityGroupIds,
        SubnetId: subnetId,
        IamInstanceProfile: iamInstanceProfile,
        TagSpecifications: tagSpecifications,
        UserData: userData, // UserData (must be base64 encoded)
    };
    const runInstancesCommand = new client_ec2_1.RunInstancesCommand(params);
    try {
        const instanceData = yield client.send(runInstancesCommand);
        let instanceId = "";
        if (instanceData.Instances && instanceData.Instances[0].InstanceId) {
            instanceId = instanceData.Instances[0].InstanceId;
        }
        console.log(`*** Created instance with ID: ${instanceId} ***`);
        return instanceId;
    }
    catch (error) {
        throw new Error(`Error creating EC2 instance: ${error}`);
    }
});
exports.createEC2 = createEC2;
