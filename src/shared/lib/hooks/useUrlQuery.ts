import { useCallback, useEffect, useState } from 'react'

interface UrlQueryParams {
  page?: number
  limit?: number
  search?: string
}

interface UseUrlQueryReturn {
  queryParams: UrlQueryParams
  updateQueryParams: (params: Partial<UrlQueryParams>) => void
  syncWithState: (state: { skip: number; limit: number; search?: string }) => void
}

export function useUrlQuery(): UseUrlQueryReturn {
  // Initialize with parsed query params from URL
  const [queryParams, setQueryParams] = useState<UrlQueryParams>(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    return {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search: search || undefined
    }
  })

  // Update query parameters in URL
  const updateQueryParams = useCallback((params: Partial<UrlQueryParams>) => {
    const url = new URL(window.location.href)
    const searchParams = new URLSearchParams(url.search)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, value.toString())
      } else {
        searchParams.delete(key)
      }
    })

    // Update URL without page reload
    const newUrl = `${url.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    window.history.pushState({}, '', newUrl)

    // Update local state
    const newSearchParams = new URLSearchParams(newUrl.split('?')[1] || '')
    setQueryParams({
      page: newSearchParams.get('page') ? parseInt(newSearchParams.get('page')!, 10) : undefined,
      limit: newSearchParams.get('limit') ? parseInt(newSearchParams.get('limit')!, 10) : undefined,
      search: newSearchParams.get('search') || undefined
    })
  }, [])

  // Sync component state with URL
  const syncWithState = useCallback((state: { skip: number; limit: number; search?: string }) => {
    const page = Math.floor(state.skip / state.limit) + 1
  
    updateQueryParams({
      page: page > 1 ? page : undefined, // Don't store page 1
      limit: state.limit !== 10 ? state.limit : undefined, // Don't store default limit
      search: state.search || undefined
    })
  }, [updateQueryParams])

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search)
      setQueryParams({
        page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : undefined,
        limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined,
        search: searchParams.get('search') || undefined
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return {
    queryParams,
    updateQueryParams,
    syncWithState
  }
}
