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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRestApi = void 0;
const createMethod_1 = require("./createMethod");
const createResource_1 = require("./createResource");
const createRestAPI_1 = require("./createRestAPI");
function setupRestApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const restApiId = yield (0, createRestAPI_1.createRestApi)();
        const resourceId = yield (0, createResource_1.createResource)(restApiId);
        yield (0, createMethod_1.createMethod)(restApiId, resourceId, "POST"); // HARDCODED httpMethod
        // TODO: create resource policy on the rest api (limit to github webhook ip ranges)
        console.log("✅ api CREATED:", restApiId);
        return { restApiId, resourceId };
    });
}
exports.setupRestApi = setupRestApi;
