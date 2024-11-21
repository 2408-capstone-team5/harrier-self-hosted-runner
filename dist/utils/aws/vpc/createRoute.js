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
exports.createRoute = void 0;
const client_ec2_1 = require("@aws-sdk/client-ec2");
// import { configAWS } from "./configAWS";
const ec2Client = new client_ec2_1.EC2Client({ region: "us-east-1" });
const createRoute = (routeTableId, internetGatewayId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            RouteTableId: routeTableId,
            DestinationCidrBlock: "0.0.0.0/0",
            GatewayId: internetGatewayId,
        };
        const command = new client_ec2_1.CreateRouteCommand(params);
        yield ec2Client.send(command);
        console.log(`   Route to Internet Gateway ${internetGatewayId} created in Route Table ${routeTableId}\n`);
    }
    catch (error) {
        throw new Error(`Error creating route: ${error}`);
    }
});
exports.createRoute = createRoute;
