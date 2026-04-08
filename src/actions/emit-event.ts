import { sharedEvents } from "../shared-events";
import { EventNameType } from "../events.model";

export function emitEvent(event: EventNameType, ...args: any[]) {
    const callbacks = sharedEvents[event];
    if (!callbacks) {
        return;
    }

    callbacks.forEach(callback => callback(...args));
}
