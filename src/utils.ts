import { EventCallbackType } from "./events.model";

export function getAsArray(value: EventCallbackType[] | EventCallbackType): EventCallbackType[] {
    return Array.isArray(value) ? value : [value];
}
