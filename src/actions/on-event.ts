import { lastEmittedValues, sharedEvents } from "../shared-events";
import { getAsArray } from "../utils";
import { EventCallbackType, EventNameType } from "../events.model";

export function onEvent(event: EventNameType, callback: EventCallbackType[] | EventCallbackType) {
    const callbacks = sharedEvents[event] ?? [];

    const newCallbacks = getAsArray(callback)
    callbacks.push(...newCallbacks);

    sharedEvents[event] = callbacks;

    if (lastEmittedValues[event]) {
        newCallbacks.forEach(callback => callback(...lastEmittedValues[event]));
    }
}
