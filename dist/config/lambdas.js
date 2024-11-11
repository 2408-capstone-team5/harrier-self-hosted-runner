"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.workflow = void 0;
exports.workflow = {
    Action: "lambda:InvokeFunction",
    Principal: "apigateway.amazonaws.com",
    StatementId: "InvokePermission_RestApi_Execute_Lambda",
};
exports.cleanup = {};
