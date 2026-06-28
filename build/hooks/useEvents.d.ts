import { InitEventsType } from "../events.model";
import { emitEvent, onEvent, removeEvent } from "../actions";
export declare const useEvents: (eventMap?: InitEventsType) => {
    onEvent: typeof onEvent;
    emitEvent: typeof emitEvent;
    removeEvent: typeof removeEvent;
    clearMemo: (key: import("../events.model").EventNameType) => void;
};
