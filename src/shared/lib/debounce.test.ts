import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '@/shared/lib/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should delay function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('test');

    // Should not be called immediately
    expect(fn).not.toHaveBeenCalled();

    // Should be called after delay
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('test');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should cancel previous call when called multiple times', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    vi.advanceTimersByTime(100);

    // Should only be called once with the last argument
    expect(fn).toHaveBeenCalledWith('third');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should work with multiple arguments', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2', 'arg3');

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  test('should reset timer when called within delay period', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('first');
    vi.advanceTimersByTime(50);

    debouncedFn('second');
    vi.advanceTimersByTime(50);

    // Should not be called yet (timer reset)
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    // Should be called with second argument
    expect(fn).toHaveBeenCalledWith('second');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
