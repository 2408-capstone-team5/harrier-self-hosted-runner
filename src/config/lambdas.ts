export const workflow = {
  Action: "lambda:InvokeFunction",
  Principal: "apigateway.amazonaws.com",
  StatementId: "InvokePermission_RestApi_Execute_Lambda",
};

export const cleanup = {};
