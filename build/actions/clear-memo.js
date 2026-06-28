"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMemo = void 0;
var shared_events_1 = require("../shared-events");
var clearMemo = function (key) {
    shared_events_1.lastEmittedValues[key] = undefined;
    delete shared_events_1.lastEmittedValues[key];
};
exports.clearMemo = clearMemo;
