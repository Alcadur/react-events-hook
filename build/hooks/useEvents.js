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
exports.useEvents = void 0;
var react_1 = require("react");
var actions_1 = require("../actions");
var useEvents = function (eventMap) {
    if (eventMap === void 0) { eventMap = {}; }
    (0, react_1.useEffect)(function () {
        if (!eventMap) {
            return;
        }
        var events = __spreadArray(__spreadArray([], Object.keys(eventMap), true), Object.getOwnPropertySymbols(eventMap), true);
        events.forEach(function (event) {
            (0, actions_1.onEvent)(event, eventMap[event]);
        });
        return function () {
            events.forEach(function (event) {
                (0, actions_1.removeEvent)(event, eventMap[event]);
            });
        };
    }, [eventMap]);
    return { onEvent: actions_1.onEvent, emitEvent: actions_1.emitEvent, removeEvent: actions_1.removeEvent, clearMemo: actions_1.clearMemo };
};
exports.useEvents = useEvents;
