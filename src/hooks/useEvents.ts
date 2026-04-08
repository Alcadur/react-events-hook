import { useEffect } from "react";
import { InitEventsType } from "../events.model";
import { emitEvent, onEvent, removeEvent } from "../actions";

export const useEvents = (eventMap: InitEventsType = {}) => {
    useEffect(() => {
        if (!eventMap) {
            return;
        }
        const events = [...Object.keys(eventMap), ...Object.getOwnPropertySymbols(eventMap)]

        events.forEach( event => {
            onEvent(event, eventMap[event])
        })

        return () => {
            events.forEach((event) => {
                removeEvent(event, eventMap[event])
            })
        }
    }, [eventMap])

    return { onEvent, emitEvent, removeEvent };
};
