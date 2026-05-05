import { beforeEach, describe, expect, it, vi } from "vitest";
import { lastEmittedValues, sharedEvents } from "../shared-events";
import { emitEvent } from "./emit-event";
import { onEvent } from "./on-event";
import { removeEvent } from "./remove-event";
import { clearMemo } from "./clear-memo";

describe("actions", () => {
    beforeEach(() => {
        Object.keys(sharedEvents).forEach((key) => delete sharedEvents[key]);
        Object.keys(lastEmittedValues).forEach((key) => delete lastEmittedValues[key]);
    });

    describe("onEvent", () => {
        it("registers a single callback", () => {
            const callback = vi.fn();

            onEvent("test-event", callback);

            expect(sharedEvents["test-event"]).toEqual([callback]);
        });

        it("registers an array of callbacks", () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            onEvent("test-event", [callback1, callback2]);

            expect(sharedEvents["test-event"]).toEqual([callback1, callback2]);
        });
    });

    describe("emitEvent", () => {
        it("invokes all callbacks with provided args", () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            onEvent("test-event", [callback1, callback2]);
            emitEvent("test-event", "data", 1);

            expect(callback1).toHaveBeenCalledWith("data", 1);
            expect(callback2).toHaveBeenCalledWith("data", 1);
        });

        it("does nothing when event has no callbacks", () => {
            expect(() => emitEvent("missing-event", "data")).not.toThrow();
        });

        describe("memo", () => {
            it("invokes all callback and stores the value", () => {
                const callback = vi.fn();
                onEvent("memo-event", callback);

                emitEvent.memo("memo-event", "memo-data");

                expect(callback).toHaveBeenCalledWith("memo-data");
                expect(lastEmittedValues["memo-event"]).toEqual(["memo-data"]);
            });

            it("triggers callback immediately if event was already memoized", () => {
                const callback = vi.fn();

                emitEvent.memo("memo-event", "old-data");
                onEvent("memo-event", callback);

                expect(callback).toHaveBeenCalledWith("old-data");
            });

            it("clears memoized value when emitEvent.memo is called with undefined", () => {
                const callback = vi.fn();
                onEvent("memo-event", callback);

                emitEvent.memo("memo-event", "some-data");
                expect(lastEmittedValues["memo-event"]).toEqual(["some-data"]);
                expect(callback).toHaveBeenCalledWith("some-data");

                emitEvent.memo("memo-event", undefined);
                expect(lastEmittedValues["memo-event"]).toBeUndefined();
                expect(callback).toHaveBeenCalledWith(undefined);
            });

            it("should not trigger callback immediately when last emitted value is undefined", () => {
                const callback = vi.fn();
                const callback2 = vi.fn();

                emitEvent.memo("memo-event", "some-data");
                onEvent("memo-event", callback);
                expect(callback).toHaveBeenCalledWith("some-data");

                emitEvent.memo("memo-event", undefined);
                onEvent("memo-event", callback2);
                expect(callback).toHaveBeenCalledWith(undefined);
                expect(callback2).not.toHaveBeenCalled();
            });
        });
    });

    describe("clearMemo", () => {
        it("removes the memoized value for a given event", () => {
            emitEvent.memo("test-event", "data");
            expect(lastEmittedValues["test-event"]).toEqual(["data"]);

            clearMemo("test-event");
            expect(lastEmittedValues["test-event"]).toBeUndefined();
        });

        it("does not trigger callbacks", () => {
            const callback = vi.fn();
            onEvent("test-event", callback);
            emitEvent.memo("test-event", "data");
            callback.mockClear();

            clearMemo("test-event");
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe("removeEvent", () => {
        it("removes a single callback", () => {
            const callback = vi.fn();

            onEvent("test-event", callback);
            removeEvent("test-event", callback);
            emitEvent("test-event", "data");

            expect(callback).not.toHaveBeenCalled();
        });

        it("removes multiple callbacks from array input", () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            onEvent("test-event", [callback1, callback2]);
            removeEvent("test-event", [callback1, callback2]);
            emitEvent("test-event", "data");

            expect(callback1).not.toHaveBeenCalled();
            expect(callback2).not.toHaveBeenCalled();
        });

        it("does nothing when event has no callbacks", () => {
            const callback = vi.fn();

            expect(() => removeEvent("missing-event", callback)).not.toThrow();
        });
    });
});
