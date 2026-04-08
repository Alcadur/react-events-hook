import { useEffect } from "react";
import { EventCallbackType, InitEventsType } from "../events.model";
import { getAsArray } from "../utils";
import { sharedEvents } from "../shared-events";

export const useEvents = (eventMap: InitEventsType = {}) => {
    const onEvent = (event: string, callback: EventCallbackType[] | EventCallbackType) => {
        const callbacks = sharedEvents[event] ?? [];

        callbacks.push(...getAsArray(callback));

        sharedEvents[event] = callbacks;
    }

    useEffect(() => {
        if (!eventMap) {
            return;
        }
        const eventMapEntries = Object.entries(eventMap);
        eventMapEntries.forEach(([event, callback]) => {
            onEvent(event, callback)
        })

        return () => {
            eventMapEntries.forEach(([event, callback]) => {
                removeEvent(event, callback)
            })
        }
    }, [eventMap])

    const emitEvent = (event: string, ...args: any[]) => {
        const callbacks = sharedEvents[event];
        if (!callbacks) {
            return;
        }

        callbacks.forEach(callback => callback(...args));
    }

    const removeEvent = (event: string, callback: EventCallbackType | EventCallbackType[]) => {
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

    return { onEvent, emitEvent, removeEvent };
};
