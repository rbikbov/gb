import type { FC } from 'react'

import type { User as UserType } from '@/entities/user'
import { UserCard } from '@/entities/user'

import { DataList, type ViewMode } from '@/shared/ui/data-list/data-list'
import { EmptyState } from '@/shared/ui/states/empty-state'

import { UsersTable } from './users-table'

export interface UsersListContentProps {
  users: UserType[]
  viewMode: ViewMode
  loading: boolean
  showNoDataMessage?: boolean
  searchQuery?: string
  onClearSearch?: () => void
}

export const UsersListContent: FC<UsersListContentProps> = ({
  users,
  viewMode,
  loading,
  showNoDataMessage = false,
  searchQuery,
  onClearSearch,
}) => {
  const hasData = Array.isArray(users) && users.length > 0

  if (showNoDataMessage && !hasData && !loading) {
    return (
      <EmptyState
        className="flex-1"
        title={
          searchQuery
            ? `No users found for "${searchQuery}"`
            : 'No users available'
        }
        message={
          searchQuery
            ? 'Try adjusting your search terms'
            : 'There are no users to display'
        }
        action={
          searchQuery && onClearSearch
            ? {
                label: 'Clear search',
                onClick: onClearSearch,
                variant: 'secondary',
              }
            : undefined
        }
      />
    )
  }

  return (
    <>
      <DataList
        className="relative flex-1"
        data={users}
        loading={loading}
        viewMode={viewMode}
        renderItem={user => <UserCard key={user.id} user={user} />}
        renderTable={users => <UsersTable users={users} />}
        keyExtractor={user => user.id}
        emptyState={{
          title: 'No users found',
          message: 'There are no users to display',
        }}
        loadingState={{
          overlay: users.length > 0,
        }}
      />
    </>
  )
}
