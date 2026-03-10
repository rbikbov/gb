import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUrlQuery } from '@/shared/lib/hooks/useUrlQuery';

describe('useUrlQuery', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  test('should parse empty URL parameters', () => {
    const { result } = renderHook(() => useUrlQuery());

    expect(result.current.queryParams).toEqual({
      page: 1,
      limit: 10,
      search: ''
    });
  });

  test('should parse URL with page parameter', () => {
    window.history.pushState({}, '', '/?page=3');

    const { result } = renderHook(() => useUrlQuery());

    expect(result.current.queryParams).toEqual({
      page: 3,
      limit: 10,
      search: ''
    });
  });

  test('should parse URL with search parameter', () => {
    window.history.pushState({}, '', '/?search=john');

    const { result } = renderHook(() => useUrlQuery());

    expect(result.current.queryParams).toEqual({
      page: 1,
      limit: 10,
      search: 'john'
    });
  });

  test('should parse URL with all parameters', () => {
    window.history.pushState({}, '', '/?page=2&limit=20&search=test');

    const { result } = renderHook(() => useUrlQuery());

    expect(result.current.queryParams).toEqual({
      page: 2,
      limit: 20,
      search: 'test'
    });
  });

  test('should update URL when updateQueryParams is called', () => {
    const { result } = renderHook(() => useUrlQuery());

    result.current.updateQueryParams({ page: 5, search: 'updated' });

    expect(window.location.search).toBe('?page=5&search=updated');
  });

  test('should remove parameter when value is empty', () => {
    window.history.pushState({}, '', '/?page=2&search=test');

    const { result } = renderHook(() => useUrlQuery());

    result.current.updateQueryParams({ search: '' });

    expect(window.location.search).toBe('?page=2');
  });
});
