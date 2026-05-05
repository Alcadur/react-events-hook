import type { EventCallbackType, EventNameType } from "./events.model";

export const sharedEvents: { [key: EventNameType]: EventCallbackType[] } = {};

export const lastEmittedValues: { [key: EventNameType]: any } = {};
