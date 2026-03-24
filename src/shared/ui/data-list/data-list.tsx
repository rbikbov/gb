import { EmptyState } from '../states/empty-state'
import { LoadingState } from '../states/loading-state'

export type ViewMode = 'grid' | 'list' | 'table'

export interface DataListProps<T> {
  data: T[]
  loading?: boolean
  error?: Error | null
  viewMode?: ViewMode
  renderItem: (item: T, index: number) => React.ReactNode
  renderTable?: (items: T[]) => React.ReactNode
  keyExtractor: (item: T, index: number) => string | number
  emptyState?: {
    title?: string
    message?: string
    action?: {
      label: string
      onClick: () => void
      variant?: 'primary' | 'secondary'
    }
  }
  loadingState?: {
    message?: string
    overlay?: boolean
  }
  className?: string
  gridClassName?: string
  listClassName?: string
  tableClassName?: string
}

export function DataList<T>({
  data,
  loading = false,
  error = null,
  viewMode = 'grid',
  renderItem,
  renderTable,
  keyExtractor,
  emptyState,
  loadingState,
  className = '',
  gridClassName = 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch',
  listClassName = 'space-y-4',
  tableClassName = 'table-container',
}: DataListProps<T>) {
  if (error) {
    throw error // Let ErrorBoundary handle it
  }

  if (loading && !loadingState?.overlay) {
    return (
      <LoadingState
        message={loadingState?.message}
        overlay={loadingState?.overlay}
        className={className}
      />
    )
  }

  if (!loading && !error && !data.length) {
    return (
      <EmptyState
        title={emptyState?.title}
        message={emptyState?.message}
        action={emptyState?.action}
        className={className}
      />
    )
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <div className={`${gridClassName}`}>
            {data.map((item, index) => (
              <div className="flex items-stretch" key={keyExtractor(item, index)}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        )

      case 'list':
        return (
          <div className={`${listClassName}`}>
            {data.map((item, index) => (
              <div key={keyExtractor(item, index)}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        )

      case 'table':
        if (renderTable) {
          return <div className={`${tableClassName}`}>{renderTable(data)}</div>
        }
        // Fallback to list if table render not provided
        return (
          <div className={`${listClassName}`}>
            {data.map((item, index) => (
              <div key={keyExtractor(item, index)}>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative">
      {loading && loadingState?.overlay && (
        <LoadingState
          message={loadingState?.message}
          overlay={loadingState?.overlay}
        />
      )}
      <div className={className}>{renderContent()}</div>
    </div>
  )
}
