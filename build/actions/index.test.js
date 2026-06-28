"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var shared_events_1 = require("../shared-events");
var emit_event_1 = require("./emit-event");
var on_event_1 = require("./on-event");
var remove_event_1 = require("./remove-event");
var clear_memo_1 = require("./clear-memo");
(0, vitest_1.describe)("actions", function () {
    (0, vitest_1.beforeEach)(function () {
        Object.keys(shared_events_1.sharedEvents).forEach(function (key) { return delete shared_events_1.sharedEvents[key]; });
        Object.keys(shared_events_1.lastEmittedValues).forEach(function (key) { return delete shared_events_1.lastEmittedValues[key]; });
    });
    (0, vitest_1.describe)("onEvent", function () {
        (0, vitest_1.it)("registers a single callback", function () {
            var callback = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", callback);
            (0, vitest_1.expect)(shared_events_1.sharedEvents["test-event"]).toEqual([callback]);
        });
        (0, vitest_1.it)("registers an array of callbacks", function () {
            var callback1 = vitest_1.vi.fn();
            var callback2 = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", [callback1, callback2]);
            (0, vitest_1.expect)(shared_events_1.sharedEvents["test-event"]).toEqual([callback1, callback2]);
        });
    });
    (0, vitest_1.describe)("emitEvent", function () {
        (0, vitest_1.it)("invokes all callbacks with provided args", function () {
            var callback1 = vitest_1.vi.fn();
            var callback2 = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", [callback1, callback2]);
            (0, emit_event_1.emitEvent)("test-event", "data", 1);
            (0, vitest_1.expect)(callback1).toHaveBeenCalledWith("data", 1);
            (0, vitest_1.expect)(callback2).toHaveBeenCalledWith("data", 1);
        });
        (0, vitest_1.it)("does nothing when event has no callbacks", function () {
            (0, vitest_1.expect)(function () { return (0, emit_event_1.emitEvent)("missing-event", "data"); }).not.toThrow();
        });
        (0, vitest_1.describe)("memo", function () {
            (0, vitest_1.it)("invokes all callback and stores the value", function () {
                var callback = vitest_1.vi.fn();
                (0, on_event_1.onEvent)("memo-event", callback);
                emit_event_1.emitEvent.memo("memo-event", "memo-data");
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith("memo-data");
                (0, vitest_1.expect)(shared_events_1.lastEmittedValues["memo-event"]).toEqual(["memo-data"]);
            });
            (0, vitest_1.it)("triggers callback immediately if event was already memoized", function () {
                var callback = vitest_1.vi.fn();
                emit_event_1.emitEvent.memo("memo-event", "old-data");
                (0, on_event_1.onEvent)("memo-event", callback);
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith("old-data");
            });
            (0, vitest_1.it)("clears memoized value when emitEvent.memo is called with undefined", function () {
                var callback = vitest_1.vi.fn();
                (0, on_event_1.onEvent)("memo-event", callback);
                emit_event_1.emitEvent.memo("memo-event", "some-data");
                (0, vitest_1.expect)(shared_events_1.lastEmittedValues["memo-event"]).toEqual(["some-data"]);
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith("some-data");
                emit_event_1.emitEvent.memo("memo-event", undefined);
                (0, vitest_1.expect)(shared_events_1.lastEmittedValues["memo-event"]).toBeUndefined();
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith(undefined);
            });
            (0, vitest_1.it)("should not trigger callback immediately when last emitted value is undefined", function () {
                var callback = vitest_1.vi.fn();
                var callback2 = vitest_1.vi.fn();
                emit_event_1.emitEvent.memo("memo-event", "some-data");
                (0, on_event_1.onEvent)("memo-event", callback);
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith("some-data");
                emit_event_1.emitEvent.memo("memo-event", undefined);
                (0, on_event_1.onEvent)("memo-event", callback2);
                (0, vitest_1.expect)(callback).toHaveBeenCalledWith(undefined);
                (0, vitest_1.expect)(callback2).not.toHaveBeenCalled();
            });
        });
    });
    (0, vitest_1.describe)("clearMemo", function () {
        (0, vitest_1.it)("removes the memoized value for a given event", function () {
            emit_event_1.emitEvent.memo("test-event", "data");
            (0, vitest_1.expect)(shared_events_1.lastEmittedValues["test-event"]).toEqual(["data"]);
            (0, clear_memo_1.clearMemo)("test-event");
            (0, vitest_1.expect)(shared_events_1.lastEmittedValues["test-event"]).toBeUndefined();
        });
        (0, vitest_1.it)("does not trigger callbacks", function () {
            var callback = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", callback);
            emit_event_1.emitEvent.memo("test-event", "data");
            callback.mockClear();
            (0, clear_memo_1.clearMemo)("test-event");
            (0, vitest_1.expect)(callback).not.toHaveBeenCalled();
        });
    });
    (0, vitest_1.describe)("removeEvent", function () {
        (0, vitest_1.it)("removes a single callback", function () {
            var callback = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", callback);
            (0, remove_event_1.removeEvent)("test-event", callback);
            (0, emit_event_1.emitEvent)("test-event", "data");
            (0, vitest_1.expect)(callback).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)("removes multiple callbacks from array input", function () {
            var callback1 = vitest_1.vi.fn();
            var callback2 = vitest_1.vi.fn();
            (0, on_event_1.onEvent)("test-event", [callback1, callback2]);
            (0, remove_event_1.removeEvent)("test-event", [callback1, callback2]);
            (0, emit_event_1.emitEvent)("test-event", "data");
            (0, vitest_1.expect)(callback1).not.toHaveBeenCalled();
            (0, vitest_1.expect)(callback2).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)("does nothing when event has no callbacks", function () {
            var callback = vitest_1.vi.fn();
            (0, vitest_1.expect)(function () { return (0, remove_event_1.removeEvent)("missing-event", callback); }).not.toThrow();
        });
    });
});
