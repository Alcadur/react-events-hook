import { sharedEvents } from "../shared-events";
import { getAsArray } from "../utils";
import { EventCallbackType, EventNameType } from "../events.model";

export function removeEvent(event: EventNameType, callback: EventCallbackType | EventCallbackType[]) {
    const declaredCallbacks = sharedEvents[event];
    if (!declaredCallbacks) {
        return;
    }

    getAsArray(callback).forEach(cb => {
        const index = declaredCallbacks.indexOf(cb);
        if (index !== -1) {
            declaredCallbacks.splice(index, 1);
        }
    })
}
