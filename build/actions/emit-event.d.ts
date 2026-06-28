import { EventNameType } from "../events.model";
export declare function emitEvent(event: EventNameType, ...args: any[]): void;
export declare namespace emitEvent {
    var memo: (event: EventNameType, ...args: any[]) => void;
}
