import type { FC } from 'react'

import { useScrollDirection } from '@/shared/lib/hooks'

import { ViewMode, type ViewModeType } from '../model/types'
import { UsersPaginator } from './users-paginator'
import { UsersSearch } from './users-search'

export interface UsersListHeaderProps {
  searchValue: string
  onSearchChange: (value: string) => void
  viewMode: ViewModeType
  onViewModeChange: (mode: ViewModeType) => void
  limit: number
  skip: number
  total: number
  onPaginationChange: (newState: { skip: number; limit: number }) => void
}

export const UsersListHeader: FC<UsersListHeaderProps> = ({
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
  limit,
  skip,
  total,
  onPaginationChange,
}) => {
  const { direction } = useScrollDirection()
  const isScrollingUp = direction === 'up'

  return (
    <div
      className={`py-4 bg-neutral-800 ${isScrollingUp ? 'sticky top-0' : ''}`}
      style={{
        zIndex: 50,
        top: isScrollingUp ? 0 : '-100%',
        transition: 'top 0.5s ease-in-out',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UsersSearch
          className="col-span-full xl:col-span-1"
          value={searchValue}
          onChange={onSearchChange}
        />

        <div className="col-span-full xl:col-span-3 flex justify-between items-center flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <label htmlFor="view-mode-select" className="text-sm text-gray-300">
              View mode:
            </label>
            <select
              id="view-mode-select"
              className="bg-neutral-800 cursor-pointer p-1.5"
              value={viewMode}
              onChange={e => onViewModeChange(e.target.value as ViewModeType)}
              aria-label="View mode"
            >
              <option value={ViewMode.GRID}>Grid</option>
              <option value={ViewMode.TABLE}>Table</option>
            </select>
          </div>

          <UsersPaginator
            limit={limit}
            skip={skip}
            total={total}
            onChange={onPaginationChange}
            showAllPages={false}
          />
        </div>
      </div>
    </div>
  )
}
