import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DeleteIndexPolicyCommand, se_DeleteIndexPolicyCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DeleteIndexPolicyCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Logs_20140328", "DeleteIndexPolicy", {})
    .n("CloudWatchLogsClient", "DeleteIndexPolicyCommand")
    .f(void 0, void 0)
    .ser(se_DeleteIndexPolicyCommand)
    .de(de_DeleteIndexPolicyCommand)
    .build() {
}
