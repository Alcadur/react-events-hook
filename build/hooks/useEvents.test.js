"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var useEvents_1 = require("./useEvents");
var vitest_1 = require("vitest");
var shared_events_1 = require("../shared-events");
(0, vitest_1.describe)('useEvents', function () {
    (0, vitest_1.beforeEach)(function () {
        Object.keys(shared_events_1.sharedEvents).forEach(function (key) { return delete shared_events_1.sharedEvents[key]; });
        Object.keys(shared_events_1.lastEmittedValues).forEach(function (key) { return delete shared_events_1.lastEmittedValues[key]; });
    });
    (0, vitest_1.it)('should register and emit events', function () {
        var result = (0, react_1.renderHook)(function () { return (0, useEvents_1.useEvents)(); }).result;
        var callback = vitest_1.vi.fn();
        (0, react_1.act)(function () {
            result.current.onEvent('test-event', callback);
        });
        (0, react_1.act)(function () {
            result.current.emitEvent('test-event', 'data');
        });
        (0, vitest_1.expect)(callback).toHaveBeenCalledWith('data');
    });
    (0, vitest_1.it)('should remove events', function () {
        var result = (0, react_1.renderHook)(function () { return (0, useEvents_1.useEvents)(); }).result;
        var callback = vitest_1.vi.fn();
        (0, react_1.act)(function () {
            result.current.onEvent('test-event', callback);
            result.current.removeEvent('test-event', callback);
        });
        (0, react_1.act)(function () {
            result.current.emitEvent('test-event', 'data');
        });
        (0, vitest_1.expect)(callback).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('should register events from init map', function () {
        var callback = vitest_1.vi.fn();
        var callbackSymbol = vitest_1.vi.fn();
        var symbolEvent = Symbol('init-event');
        (0, react_1.renderHook)(function () {
            var _a;
            return (0, useEvents_1.useEvents)((_a = {
                    'init-event': callback
                },
                _a[symbolEvent] = callbackSymbol,
                _a));
        });
        var result = (0, react_1.renderHook)(function () { return (0, useEvents_1.useEvents)(); }).result;
        (0, react_1.act)(function () {
            result.current.emitEvent('init-event', 'init-data');
            result.current.emitEvent(symbolEvent);
        });
        (0, vitest_1.expect)(callback).toHaveBeenCalledWith('init-data');
        (0, vitest_1.expect)(callbackSymbol).toHaveBeenCalled();
    });
    (0, vitest_1.it)('should support memoized events', function () {
        var result = (0, react_1.renderHook)(function () { return (0, useEvents_1.useEvents)(); }).result;
        var callback = vitest_1.vi.fn();
        (0, react_1.act)(function () {
            result.current.emitEvent.memo('memo-event', 'memo-data');
        });
        (0, react_1.act)(function () {
            result.current.onEvent('memo-event', callback);
        });
        (0, vitest_1.expect)(callback).toHaveBeenCalledWith('memo-data');
    });
    (0, vitest_1.it)('should clear memoized events', function () {
        var result = (0, react_1.renderHook)(function () { return (0, useEvents_1.useEvents)(); }).result;
        var callback = vitest_1.vi.fn();
        (0, react_1.act)(function () {
            result.current.emitEvent.memo('memo-event', 'memo-data');
        });
        (0, react_1.act)(function () {
            result.current.clearMemo('memo-event');
        });
        (0, react_1.act)(function () {
            result.current.onEvent('memo-event', callback);
        });
        (0, vitest_1.expect)(callback).not.toHaveBeenCalled();
    });
});
