import { useCallback } from 'react'

import { useUrlQuery } from '@/shared/lib/hooks'

import { useUsersData } from '../lib/hooks'
import { useViewMode } from '../lib/hooks'
import { UsersListContent } from './users-list-content'
import { UsersListError } from './users-list-error'
import { UsersListHeader } from './users-list-header'

export function UsersList() {
  const { queryParams, updateQueryParams } = useUrlQuery()
  const { viewMode, setViewMode } = useViewMode()

  const { page, limit, search } = queryParams
  const skip = (page - 1) * limit

  const { usersResponse, loading, error, refetch } = useUsersData({
    skip,
    limit,
    search,
  })

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

  if (usersResponse?.total && skip > usersResponse.total) {
    updateQueryParams({
      search,
      page: 1,
    })
  }

  if (error) {
    return <UsersListError error={error} onRetry={refetch} />
  }

  const searchNoData = Boolean(
    search && !loading && !usersResponse?.users?.length
  )

  return (
    <>
      <UsersListHeader
        searchValue={search}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        limit={limit}
        skip={skip}
        total={usersResponse?.total || 0}
        onPaginationChange={handlePaginationChange}
      />

      <UsersListContent
        users={usersResponse?.users || []}
        viewMode={viewMode}
        loading={loading}
        showNoDataMessage={searchNoData}
        searchQuery={search}
        onClearSearch={() =>
          updateQueryParams({ search: undefined, page: undefined })
        }
      />
    </>
  )
}
