"use strict";
/*
    requires:
        - personal-access-token
        - org
        - repo
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
// import core from "@actions/core";
var repo = "fake-setup-harrier-action"; // HARDCODED
var org = "2408-capstone-team5";
var pat = "ghp...";
function setupWebhook(restApiId, stageName) {
    var _a;
    if (stageName === void 0) { stageName = "dev"; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post("https://api.github.com/repos/".concat(org, "/").concat(repo, "/hooks"), {
                            config: {
                                url: "https://".concat(restApiId, ".execute-api.us-east-1.amazonaws.com/").concat(stageName, "/workflow"),
                                content_type: "json",
                                insecure_ssl: "0"
                            },
                            events: ["workflow_job"],
                            active: true,
                            name: "web",
                            owner: org,
                            repo: repo
                        }, {
                            headers: {
                                Authorization: "Bearer ".concat(pat),
                                Accept: "application/vnd.github.v3+json",
                                "X-GitHub-Api-Version": "2022-11-28"
                            }
                        })];
                case 1:
                    response = _b.sent();
                    console.log("✅ Webhook created successfully:", response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    if (axios_1["default"].isAxiosError(error_1)) {
                        console.error("Error creating webhook:", (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data);
                    }
                    else {
                        console.error("Unexpected error:", error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = setupWebhook;
// const getRegistrationToken = async () => {
//   try {
//     const response = await octokit.request(
//       "POST /orgs/{org}/actions/runners/registration-token",
//       {
//         org: core.getInput("org"),
//         headers: {
//           "X-GitHub-Api-Version": "2022-11-28",
//         },
//       }
//     );
//     console.log("Runner registration token:", response.data.token);
//     return response.data.token;
//   } catch (error) {
//     console.error("Error fetching registration token:", error);
//   }
// };
