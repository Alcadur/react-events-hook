import { lastEmittedValues, sharedEvents } from "../shared-events";
import { EventNameType } from "../events.model";

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
        emitter(event, ...args);
    }
}
