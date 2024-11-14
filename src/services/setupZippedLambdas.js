"use strict";
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
exports.getLambda = exports.setupZippedLambdas = void 0;
var fs = require("fs");
var path = require("path");
var archiver = require("archiver");
var fs_1 = require("fs");
var path_1 = require("path");
var projectRoot = path.resolve(__dirname, "..", "..", "static");
function setupZippedLambdas() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, zipLambda("workflow")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("uncaught error in setupZippedLambdas:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.setupZippedLambdas = setupZippedLambdas;
function zipLambda(lambdaName) {
    return __awaiter(this, void 0, void 0, function () {
        var lambdaPath, zipPath, output, archive_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    lambdaPath = path.join(projectRoot, "lambdas", lambdaName);
                    zipPath = path.join(projectRoot, "zippedLambdas", "".concat(lambdaName, ".zip"));
                    fs.mkdirSync(path.dirname(zipPath), { recursive: true });
                    output = fs.createWriteStream(zipPath);
                    archive_1 = archiver.create("zip", { zlib: { level: 9 } });
                    output.on("close", function () {
                        console.log("***zip operation***\nstatus: \u2705 success \u2705\nname: \"".concat(lambdaName, "\"\nsize: ").concat(archive_1.pointer(), " bytes\nlocation: static/zippedLambdas."));
                    });
                    archive_1.pipe(output);
                    archive_1.directory(lambdaPath, "");
                    return [4 /*yield*/, archive_1.finalize()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("***zip operation***\nstatus: \u274C failed \u274C\nname: \"".concat(lambdaName, "\"\nError: ").concat(error_2));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getLambda(lambdaName) {
    var lambdaPath = path.join(projectRoot, "zippedLambdas", "".concat(lambdaName, ".zip"));
    return (0, fs_1.readFileSync)((0, path_1.resolve)(lambdaPath));
}
exports.getLambda = getLambda;
void setupZippedLambdas();
