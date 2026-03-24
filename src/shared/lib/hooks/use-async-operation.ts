import { useCallback, useEffect, useState, useRef } from 'react'

export interface AsyncOperationState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export interface AsyncOperationReturn<T> extends AsyncOperationState<T> {
  execute: (...args: unknown[]) => Promise<T | null>
  reset: () => void
  refetch: () => Promise<T | null>
}

export interface UseAsyncOperationOptions {
  immediate?: boolean
  resetOnExecute?: boolean
  abortPrevious?: boolean
}

export function useAsyncOperation<T>(
  asyncFn: (signal: AbortSignal, ...args: unknown[]) => Promise<T>,
  options: UseAsyncOperationOptions = {}
): AsyncOperationReturn<T> {
  const {
    immediate = false,
    resetOnExecute = true,
    abortPrevious = true,
  } = options

  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const lastArgsRef = useRef<unknown[] | null>(null)

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
    lastArgsRef.current = null
  }, [])

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      if (abortPrevious && abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      lastArgsRef.current = args

      if (resetOnExecute) {
        setState(prev => ({
          ...prev,
          loading: true,
          error: null,
        }))
      } else {
        setState(prev => ({
          ...prev,
          loading: true,
        }))
      }

      try {
        const result = await asyncFn(abortController.signal, ...args)

        if (!abortController.signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
          })
        }

        return result
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return null
        }

        if (!abortController.signal.aborted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          }))
        }

        return null
      }
    },
    [asyncFn, resetOnExecute, abortPrevious]
  )

  const refetch = useCallback(async (): Promise<T | null> => {
    if (lastArgsRef.current) {
      return execute(...lastArgsRef.current)
    }
    return null
  }, [execute])

  useEffect(() => {
    if (immediate) {
      execute()
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [immediate, execute])

  return {
    ...state,
    execute,
    reset,
    refetch,
  }
}
