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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_iam_1 = require("@aws-sdk/client-iam");
var client_1 = require("../../../config/client");
var iamClient = new client_iam_1.IAMClient({ region: client_1.config.region });
// THIS IS CURRENTLY JUST FOR THE `workflow` lambda!!!  can be generalized later (today?)
/*

`workflow` lambda needs to be able to:
- READ from aws secrets manager

`cleanup` lambda needs to be able to:
- S3 read/write

*/
function create_workflow_lambdaRoleWithPolicies(roleName) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var input, roleResponse, ec2Policy, logGroup, logsPolicy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = {
                        RoleName: roleName,
                        Path: "/service-role/",
                        AssumeRolePolicyDocument: JSON.stringify({
                            Version: "2012-10-17",
                            Statement: [
                                {
                                    Effect: "Allow",
                                    Principal: {
                                        Service: "lambda.amazonaws.com"
                                    },
                                    Action: "sts:AssumeRole"
                                },
                            ]
                        })
                    };
                    return [4 /*yield*/, iamClient.send(new client_iam_1.CreateRoleCommand(input))];
                case 1:
                    roleResponse = _b.sent();
                    if (!((_a = roleResponse.Role) === null || _a === void 0 ? void 0 : _a.Arn)) {
                        throw new Error("Failed to create IAM role: " + roleName);
                    }
                    ec2Policy = {
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Effect: "Allow",
                                Action: [
                                    "ec2:DescribeInstances",
                                    "ec2:StartInstances",
                                    "ec2:StopInstances",
                                    "ec2:RebootInstances",
                                ],
                                Resource: "*",
                                Condition: {
                                    StringEquals: {
                                        "ec2:ResourceTag/Name": "specific-instance-name"
                                    }
                                }
                            },
                        ]
                    };
                    logGroup = "/aws/lambda/harrier-lambda";
                    logsPolicy = {
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Effect: "Allow",
                                Action: [
                                    "logs:CreateLogGroup",
                                    "logs:CreateLogStream",
                                    "logs:PutLogEvents",
                                ],
                                Resource: "arn:aws:logs:us-east-1:536697269866:log-group:".concat(logGroup, ":*")
                            },
                        ]
                    };
                    // attach policies to the role we created
                    return [4 /*yield*/, iamClient.send(new client_iam_1.PutRolePolicyCommand({
                            RoleName: roleName,
                            PolicyName: "".concat(roleName, "_LambdaEc2Policy"),
                            PolicyDocument: JSON.stringify(ec2Policy)
                        }))];
                case 2:
                    // attach policies to the role we created
                    _b.sent();
                    return [4 /*yield*/, iamClient.send(new client_iam_1.PutRolePolicyCommand({
                            RoleName: roleName,
                            PolicyName: "".concat(roleName, "_LambdaLogsPolicy"),
                            PolicyDocument: JSON.stringify(logsPolicy)
                        }))];
                case 3:
                    _b.sent();
                    console.log("✅ attached 2 policy statements to new role");
                    return [2 /*return*/, roleResponse.Role.Arn];
            }
        });
    });
}
exports["default"] = create_workflow_lambdaRoleWithPolicies;
