export interface PaginatorProps {
  limit: number
  skip: number
  total: number
  onPageChange: ({
    skip,
    limit,
    oldPage,
    newPage,
  }: {
    skip: number
    limit: number
    oldPage: number
    newPage: number
  }) => void
  className?: string
  showAllPages?: boolean
}

export interface PaginationState {
  limit: number
  skip: number
}
