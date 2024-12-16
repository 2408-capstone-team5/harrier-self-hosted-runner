import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_DescribeFieldIndexesCommand, se_DescribeFieldIndexesCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class DescribeFieldIndexesCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Logs_20140328", "DescribeFieldIndexes", {})
    .n("CloudWatchLogsClient", "DescribeFieldIndexesCommand")
    .f(void 0, void 0)
    .ser(se_DescribeFieldIndexesCommand)
    .de(de_DescribeFieldIndexesCommand)
    .build() {
}
