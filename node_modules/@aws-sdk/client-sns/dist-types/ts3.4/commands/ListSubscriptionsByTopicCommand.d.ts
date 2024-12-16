import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import {
  ListSubscriptionsByTopicInput,
  ListSubscriptionsByTopicResponse,
} from "../models/models_0";
import {
  ServiceInputTypes,
  ServiceOutputTypes,
  SNSClientResolvedConfig,
} from "../SNSClient";
export { __MetadataBearer };
export { $Command };
export interface ListSubscriptionsByTopicCommandInput
  extends ListSubscriptionsByTopicInput {}
export interface ListSubscriptionsByTopicCommandOutput
  extends ListSubscriptionsByTopicResponse,
    __MetadataBearer {}
declare const ListSubscriptionsByTopicCommand_base: {
  new (
    input: ListSubscriptionsByTopicCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListSubscriptionsByTopicCommandInput,
    ListSubscriptionsByTopicCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    __0_0: ListSubscriptionsByTopicCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    ListSubscriptionsByTopicCommandInput,
    ListSubscriptionsByTopicCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class ListSubscriptionsByTopicCommand extends ListSubscriptionsByTopicCommand_base {
  protected static __types: {
    api: {
      input: ListSubscriptionsByTopicInput;
      output: ListSubscriptionsByTopicResponse;
    };
    sdk: {
      input: ListSubscriptionsByTopicCommandInput;
      output: ListSubscriptionsByTopicCommandOutput;
    };
  };
}
