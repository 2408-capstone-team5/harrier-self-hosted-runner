import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  GetSubscriptionAttributesInput,
  GetSubscriptionAttributesResponse,
} from "../models/models_0";
import {
  ServiceInputTypes,
  ServiceOutputTypes,
  SNSClientResolvedConfig,
} from "../SNSClient";
export { __MetadataBearer };
export { $Command };
export interface GetSubscriptionAttributesCommandInput
  extends GetSubscriptionAttributesInput {}
export interface GetSubscriptionAttributesCommandOutput
  extends GetSubscriptionAttributesResponse,
    __MetadataBearer {}
declare const GetSubscriptionAttributesCommand_base: {
  new (
    input: GetSubscriptionAttributesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetSubscriptionAttributesCommandInput,
    GetSubscriptionAttributesCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    __0_0: GetSubscriptionAttributesCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    GetSubscriptionAttributesCommandInput,
    GetSubscriptionAttributesCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class GetSubscriptionAttributesCommand extends GetSubscriptionAttributesCommand_base {
  protected static __types: {
    api: {
      input: GetSubscriptionAttributesInput;
      output: GetSubscriptionAttributesResponse;
    };
    sdk: {
      input: GetSubscriptionAttributesCommandInput;
      output: GetSubscriptionAttributesCommandOutput;
    };
  };
}
