export type EventNameType = string | number | symbol
export type EventCallbackType = ((...args: any[]) => void) | (() => void)

export type InitEventsType = { [key: EventNameType]: EventCallbackType[] | EventCallbackType }
