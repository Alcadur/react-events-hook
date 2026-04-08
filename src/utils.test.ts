import { getAsArray } from './utils';
import { describe, it, expect, vi } from "vitest";

describe('utils', () => {
    describe('getAsArray', () => {
        it('should return the same array if an array is passed', () => {
            const arr = [vi.fn()];
            expect(getAsArray(arr)).toBe(arr);
        });

        it('should wrap a single value in an array', () => {
            const callback = vi.fn();
            expect(getAsArray(callback)).toEqual([callback]);
        });
    });
});
