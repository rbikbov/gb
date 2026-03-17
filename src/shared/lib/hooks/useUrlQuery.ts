import { useCallback, useSyncExternalStore } from 'react'

export function useUrlQuery() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('popstate', callback)
    return () => window.removeEventListener('popstate', callback)
  }, [])

  const getSnapshot = () => window.location.search

  const search = useSyncExternalStore(subscribe, getSnapshot)

  const searchParams = new URLSearchParams(search)

  const queryParams = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    search: searchParams.get('search') || '',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateQueryParams = useCallback((params: Record<string, any>) => {
    const url = new URL(window.location.href)
    const newParams = new URLSearchParams(url.search)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, value.toString())
      } else {
        newParams.delete(key)
      }
    })

    const newUrl = `${url.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`
    window.history.pushState({}, '', newUrl)
    // generate event manually to update useSyncExternalStore
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [])

  return { queryParams, updateQueryParams }
}
