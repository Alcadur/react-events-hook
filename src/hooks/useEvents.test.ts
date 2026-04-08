import { renderHook, act } from '@testing-library/react';
import { useEvents } from './useEvents';
import { describe, it, expect, beforeEach, vi } from "vitest";
import { sharedEvents } from '../shared-events';

describe('useEvents', () => {
    beforeEach(() => {
        Object.keys(sharedEvents).forEach(key => delete sharedEvents[key]);
    });

    it('should register and emit events', () => {
        const { result } = renderHook(() => useEvents());
        const callback = vi.fn();

        act(() => {
            result.current.onEvent('test-event', callback);
        });

        act(() => {
            result.current.emitEvent('test-event', 'data');
        });

        expect(callback).toHaveBeenCalledWith('data');
    });

    it('should remove events', () => {
        const { result } = renderHook(() => useEvents());
        const callback = vi.fn();

        act(() => {
            result.current.onEvent('test-event', callback);
            result.current.removeEvent('test-event', callback);
        });

        act(() => {
            result.current.emitEvent('test-event', 'data');
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should register events from init map', () => {
        const callback = vi.fn();
        const callbackSymbol = vi.fn();
        const symbolEvent = Symbol('init-event');
        renderHook(() => useEvents({
            'init-event': callback,
            [symbolEvent]: callbackSymbol
        }));

        const { result } = renderHook(() => useEvents());
        act(() => {
            result.current.emitEvent('init-event', 'init-data');
            result.current.emitEvent(symbolEvent);
        });

        expect(callback).toHaveBeenCalledWith('init-data');
        expect(callbackSymbol).toHaveBeenCalled()
    });
});
