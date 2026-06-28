import type { EventCallbackType, EventNameType } from "./events.model";
export declare const sharedEvents: {
    [key: EventNameType]: EventCallbackType[];
};
export declare const lastEmittedValues: {
    [key: EventNameType]: any;
};
