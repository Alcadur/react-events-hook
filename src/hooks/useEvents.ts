import { useEffect } from "react";
import { InitEventsType } from "../events.model";
import { emitEvent, onEvent, removeEvent } from "../actions";

export const useEvents = (eventMap: InitEventsType = {}) => {
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

    return { onEvent, emitEvent, removeEvent };
};
