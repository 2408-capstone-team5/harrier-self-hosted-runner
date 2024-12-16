import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { commonParams } from "../endpoint/EndpointParameters";
import { de_ListLogGroupsForQueryCommand, se_ListLogGroupsForQueryCommand } from "../protocols/Aws_json1_1";
export { $Command };
export class ListLogGroupsForQueryCommand extends $Command
    .classBuilder()
    .ep(commonParams)
    .m(function (Command, cs, config, o) {
    return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("Logs_20140328", "ListLogGroupsForQuery", {})
    .n("CloudWatchLogsClient", "ListLogGroupsForQueryCommand")
    .f(void 0, void 0)
    .ser(se_ListLogGroupsForQueryCommand)
    .de(de_ListLogGroupsForQueryCommand)
    .build() {
}
