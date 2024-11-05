"use strict";
exports.__esModule = true;
exports.installationHash = void 0;
var now = new Date();
var timestamp = now.getTime(); // Get milliseconds since epoch
// Convert timestamp to base36 (alphanumeric)
exports.installationHash = timestamp.toString(36);
