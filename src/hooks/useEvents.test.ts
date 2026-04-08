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
        renderHook(() => useEvents({ 'init-event': callback }));

        const { result } = renderHook(() => useEvents());
        act(() => {
            result.current.emitEvent('init-event', 'init-data');
        });

        expect(callback).toHaveBeenCalledWith('init-data');
    });
});
