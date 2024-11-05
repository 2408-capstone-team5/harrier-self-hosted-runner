"use strict";
exports.__esModule = true;
exports.configHarrier = void 0;
var installationHash_1 = require("./installationHash");
exports.configHarrier = {
    tagValue: "Harrier-".concat(installationHash_1.installationHash),
    cidrBlockVPC: "10.0.0.0/16",
    cidrBlockSubnet: "10.0.0.0/24",
    vpcId: ""
};
