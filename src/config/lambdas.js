"use strict";
exports.__esModule = true;
exports.cleanup = exports.workflow = void 0;
exports.workflow = {
    Action: "lambda:InvokeFunction",
    Principal: "apigateway.amazonaws.com",
    StatementId: "InvokePermission_RestApi_Execute_Lambda"
};
exports.cleanup = {};
