"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsArray = getAsArray;
function getAsArray(value) {
    return Array.isArray(value) ? value : [value];
}
