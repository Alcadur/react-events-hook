import { lastEmittedValues, sharedEvents } from "../shared-events";
import { EventNameType } from "../events.model";
import { clearMemo } from "./clear-memo";

function emitter(event: EventNameType, ...args: any[]) {
    const callbacks = sharedEvents[event];
    if (!callbacks) {
        return;
    }

    callbacks.forEach(callback => callback(...args));
}

export function emitEvent(event: EventNameType, ...args: any[]) {
    emitter(event, ...args);
}

if (!emitEvent.memo) {
    emitEvent.memo = (event: EventNameType, ...args: any[]) => {
        lastEmittedValues[event] = args;

        if (args.length === 1 && args[0] === undefined) {
            clearMemo(event);
        }

        emitter(event, ...args);
    }
}
