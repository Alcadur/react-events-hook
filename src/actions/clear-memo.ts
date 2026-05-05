import { lastEmittedValues } from "../shared-events";
import { EventNameType } from "../events.model";

export const clearMemo = (key: EventNameType) => {
    lastEmittedValues[key] = undefined;
    delete lastEmittedValues[key];

}
