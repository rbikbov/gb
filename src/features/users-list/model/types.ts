import type { User as UserType } from '@/entities/user'

import type { ApiPaginatedResponse } from '@/shared/api'

export interface UsersListProps {
  className?: string
}

export interface UsersListData {
  users: UserType[]
  total: number
}

export interface UsersListState {
  data: ApiPaginatedResponse<UserType, 'users'> | null
  loading: boolean
  error: Error | null
}

export interface UsersListQueryParams {
  page: number
  limit: number
  search: string
}

export interface UsersListPaginationState {
  skip: number
  limit: number
}

export interface UsersListHandlers {
  onSearchChange: (value: string) => void
  onPaginationChange: (newState: UsersListPaginationState) => void
  onViewModeChange: (mode: ViewModeType) => void
  onRetry?: () => void
  onClearSearch?: () => void
}

export type ViewModeType = 'grid' | 'table'

export const ViewMode = {
  GRID: 'grid',
  TABLE: 'table',
} as const

export interface UsersListComputedProps {
  skip: number
  searchNoData: boolean
  hasData: boolean
}
