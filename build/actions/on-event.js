"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEvent = onEvent;
var shared_events_1 = require("../shared-events");
var utils_1 = require("../utils");
function onEvent(event, callback) {
    var _a;
    var callbacks = (_a = shared_events_1.sharedEvents[event]) !== null && _a !== void 0 ? _a : [];
    var newCallbacks = (0, utils_1.getAsArray)(callback);
    callbacks.push.apply(callbacks, newCallbacks);
    shared_events_1.sharedEvents[event] = callbacks;
    if (shared_events_1.lastEmittedValues[event]) {
        newCallbacks.forEach(function (callback) { return callback.apply(void 0, shared_events_1.lastEmittedValues[event]); });
    }
}
