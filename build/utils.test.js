"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var vitest_1 = require("vitest");
(0, vitest_1.describe)('utils', function () {
    (0, vitest_1.describe)('getAsArray', function () {
        (0, vitest_1.it)('should return the same array if an array is passed', function () {
            var arr = [vitest_1.vi.fn()];
            (0, vitest_1.expect)((0, utils_1.getAsArray)(arr)).toBe(arr);
        });
        (0, vitest_1.it)('should wrap a single value in an array', function () {
            var callback = vitest_1.vi.fn();
            (0, vitest_1.expect)((0, utils_1.getAsArray)(callback)).toEqual([callback]);
        });
    });
});
