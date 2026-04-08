import { sharedEvents } from "../shared-events";
import { getAsArray } from "../utils";
import { EventCallbackType, EventNameType } from "../events.model";

export function onEvent(event: EventNameType, callback: EventCallbackType[] | EventCallbackType) {
    const callbacks = sharedEvents[event] ?? [];

    callbacks.push(...getAsArray(callback));

    sharedEvents[event] = callbacks;
}
