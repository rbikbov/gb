import { useCallback, useEffect, useState } from 'react'

import type { User as UserType } from '@/entities/user'
import { UserCard } from '@/entities/user'

import type { ApiPaginatedResponse } from '@/shared/api'
import { useUrlQuery } from '@/shared/lib/hooks'
import { Loader } from '@/shared/ui'

import { useUsersListDesp } from '../deps'
import { UsersPaginator } from './users-paginator'
import { UsersSearch } from './users-search'
import { UsersTable } from './users-table'

const ViewMode = {
  GRID: 'grid',
  TABLE: 'table',
} as const

type ViewModeType = (typeof ViewMode)[keyof typeof ViewMode]

export function UsersList() {
  const { getUsers } = useUsersListDesp()
  const { queryParams, updateQueryParams } = useUrlQuery()

  const [usersResponse, setUsersResponse] = useState<ApiPaginatedResponse<
    UserType,
    'users'
  > | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.GRID)

  const { page, limit, search } = queryParams
  const skip = (page - 1) * limit

  if (usersResponse?.total && skip > usersResponse.total) {
    updateQueryParams({
      search,
      page: 1,
    })
  }

  useEffect(() => {
    const abortController = new AbortController()

    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getUsers({
          skip,
          limit,
          search,
          signal: abortController.signal,
        })
        setUsersResponse(response)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()
    return () => abortController.abort()
  }, [skip, limit, search, getUsers])

  const handleSearchChange = useCallback(
    (value: string) => {
      updateQueryParams({
        search: value,
        page: undefined,
      })
    },
    [updateQueryParams]
  )

  const handlePaginationChange = useCallback(
    (newState: { skip: number; limit: number }) => {
      const newPage = Math.floor(newState.skip / newState.limit) + 1
      updateQueryParams({
        page: newPage > 1 ? newPage : undefined,
        limit: newState.limit !== 10 ? newState.limit : undefined,
      })
    },
    [updateQueryParams]
  )

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    )
  }

  const searchNoData =
    queryParams.search && !loading && !usersResponse?.users?.length

  const hasData =
    Array.isArray(usersResponse?.users) && usersResponse.users.length > 0
  return (
    <div className="min-h-[80vh]">
      <div className="py-4 sticky top-0 z-50 bg-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <UsersSearch
            className="col-span-full xl:col-span-1"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="col-span-full xl:col-span-3 flex justify-between items-center flex-col md:flex-row">
            <select
              className="bg-neutral-800 cursor-pointer p-1.5"
              value={viewMode}
              onChange={e => setViewMode(e.target.value as ViewModeType)}
            >
              <option value={ViewMode.GRID}>Grid</option>
              <option value={ViewMode.TABLE}>Table</option>
            </select>

            <UsersPaginator
              limit={limit}
              skip={skip}
              total={usersResponse?.total || 0}
              onChange={handlePaginationChange}
              showAllPages={false}
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-[100px]">
        {searchNoData && (
          <div className="p-8 text-center">
            <p className="text-white-500">No data</p>
          </div>
        )}

        {hasData && viewMode === ViewMode.GRID && (
          <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
            {usersResponse.users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {hasData && viewMode === ViewMode.TABLE && (
          <div className="mt-4 table-container">
            <UsersTable users={usersResponse.users} />
          </div>
        )}

        <Loader isLoading={loading} size="lg" />
      </div>
    </div>
  )
}
