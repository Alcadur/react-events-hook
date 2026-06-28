"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEvent = removeEvent;
var shared_events_1 = require("../shared-events");
var utils_1 = require("../utils");
function removeEvent(event, callback) {
    var declaredCallbacks = shared_events_1.sharedEvents[event];
    if (!declaredCallbacks) {
        return;
    }
    (0, utils_1.getAsArray)(callback).forEach(function (cb) {
        var index = declaredCallbacks.indexOf(cb);
        if (index !== -1) {
            declaredCallbacks.splice(index, 1);
        }
    });
}
