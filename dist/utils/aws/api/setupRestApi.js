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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMethod_1 = __importDefault(require("./createMethod"));
const createResource_1 = __importDefault(require("./createResource"));
const createRestAPI_1 = __importDefault(require("./createRestAPI"));
function setupRestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const restApiId = yield (0, createRestAPI_1.default)();
        const resourceId = yield (0, createResource_1.default)(restApiId);
        yield (0, createMethod_1.default)(restApiId, resourceId, "POST"); // HARDCODED httpMethod
        // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
        console.log("✅ Resource: POST /workflow created on restApiId:", restApiId);
        console.log("✅ Rest API created:", restApiId);
        return { restApiId, resourceId };
    });
}
exports.default = setupRestApi;
