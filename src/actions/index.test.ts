import { beforeEach, describe, expect, it, vi } from "vitest";
import { sharedEvents } from "../shared-events";
import { emitEvent } from "./emit-event";
import { onEvent } from "./on-event";
import { removeEvent } from "./remove-event";

describe("actions", () => {
    beforeEach(() => {
        Object.keys(sharedEvents).forEach((key) => delete sharedEvents[key]);
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
