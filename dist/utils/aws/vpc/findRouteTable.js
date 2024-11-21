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
exports.findRouteTableId = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// import { configAWS } from "./configAWS";dsxdscfxf
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const findRouteTableId = (vpcId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = {
            Filters: [
                {
                    Name: "vpc-id",
                    Values: [vpcId],
                },
            ],
        };
        const command = new client_ec2_1.DescribeRouteTablesCommand(params);
        const response = yield ec2Client.send(command);
        const routeTable = (_a = response.RouteTables) === null || _a === void 0 ? void 0 : _a[0]; // Assumes that we only have 1 route table setup
        if (!routeTable || !routeTable.RouteTableId) {
            throw new Error("Route Table not found for the VPC!");
        }
        console.log("   Route Table ID:", routeTable.RouteTableId);
        return routeTable.RouteTableId;
    }
    catch (error) {
        throw new Error(`Error finding Route Table: ${error}`);
    }
});
exports.findRouteTableId = findRouteTableId;
