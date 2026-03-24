import { useCallback } from 'react'

import type { User as UserType } from '@/entities/user'

import type { ApiPaginatedResponse } from '@/shared/api'
import { useAsyncOperation } from '@/shared/lib/hooks'

import { useUsersListDesp } from '../../deps'

export interface UseUsersDataParams {
  skip: number
  limit: number
  search: string
}

export interface UseUsersDataReturn {
  usersResponse: ApiPaginatedResponse<UserType, 'users'> | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useUsersData({
  skip,
  limit,
  search,
}: UseUsersDataParams): UseUsersDataReturn {
  const { getUsers } = useUsersListDesp()

  const fetchUsers = useCallback(
    async (
      signal: AbortSignal
    ): Promise<ApiPaginatedResponse<UserType, 'users'>> => {
      return getUsers({
        skip,
        limit,
        search,
        signal,
      })
    },
    [skip, limit, search, getUsers]
  )

  const {
    data: usersResponse,
    loading,
    error,
    refetch,
  } = useAsyncOperation(fetchUsers, {
    immediate: true,
    abortPrevious: true,
  })

  return {
    usersResponse,
    loading,
    error,
    refetch,
  }
}
