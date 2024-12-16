import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { SubscribeInput, SubscribeResponse } from "../models/models_0";
import {
  ServiceInputTypes,
  ServiceOutputTypes,
  SNSClientResolvedConfig,
} from "../SNSClient";
export { __MetadataBearer };
export { $Command };
export interface SubscribeCommandInput extends SubscribeInput {}
export interface SubscribeCommandOutput
  extends SubscribeResponse,
    __MetadataBearer {}
declare const SubscribeCommand_base: {
  new (
    input: SubscribeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    SubscribeCommandInput,
    SubscribeCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    __0_0: SubscribeCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    SubscribeCommandInput,
    SubscribeCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class SubscribeCommand extends SubscribeCommand_base {
  protected static __types: {
    api: {
      input: SubscribeInput;
      output: SubscribeResponse;
    };
    sdk: {
      input: SubscribeCommandInput;
      output: SubscribeCommandOutput;
    };
  };
}
