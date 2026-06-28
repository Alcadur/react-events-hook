"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEvent = emitEvent;
var shared_events_1 = require("../shared-events");
var clear_memo_1 = require("./clear-memo");
function emitter(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var callbacks = shared_events_1.sharedEvents[event];
    if (!callbacks) {
        return;
    }
    callbacks.forEach(function (callback) { return callback.apply(void 0, args); });
}
function emitEvent(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    emitter.apply(void 0, __spreadArray([event], args, false));
}
if (!emitEvent.memo) {
    emitEvent.memo = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        shared_events_1.lastEmittedValues[event] = args;
        if (args.length === 1 && args[0] === undefined) {
            (0, clear_memo_1.clearMemo)(event);
        }
        emitter.apply(void 0, __spreadArray([event], args, false));
    };
}
