import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";
import { DeletePlatformApplicationInput } from "../models/models_0";
import {
  ServiceInputTypes,
  ServiceOutputTypes,
  SNSClientResolvedConfig,
} from "../SNSClient";
export { __MetadataBearer };
export { $Command };
export interface DeletePlatformApplicationCommandInput
  extends DeletePlatformApplicationInput {}
export interface DeletePlatformApplicationCommandOutput
  extends __MetadataBearer {}
declare const DeletePlatformApplicationCommand_base: {
  new (
    input: DeletePlatformApplicationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeletePlatformApplicationCommandInput,
    DeletePlatformApplicationCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  new (
    __0_0: DeletePlatformApplicationCommandInput
  ): import("@smithy/smithy-client").CommandImpl<
    DeletePlatformApplicationCommandInput,
    DeletePlatformApplicationCommandOutput,
    SNSClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >;
  getEndpointParameterInstructions(): import("@smithy/middleware-endpoint").EndpointParameterInstructions;
};
export declare class DeletePlatformApplicationCommand extends DeletePlatformApplicationCommand_base {
  protected static __types: {
    api: {
      input: DeletePlatformApplicationInput;
      output: {};
    };
    sdk: {
      input: DeletePlatformApplicationCommandInput;
      output: DeletePlatformApplicationCommandOutput;
    };
  };
}
