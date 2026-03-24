import type { FC } from 'react'

export interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  className?: string
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No data',
  message,
  icon,
  action,
  className = '',
}) => {
  const getActionClasses = (variant: 'primary' | 'secondary') => {
    switch (variant) {
      case 'primary':
        return 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      case 'secondary':
        return 'px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
      default:
        return 'px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {icon && <div className="mb-4">{icon}</div>}

      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>

      {message && <p className="text-gray-400 mb-4 max-w-md">{message}</p>}

      {action && (
        <button
          onClick={action.onClick}
          className={getActionClasses(action.variant || 'secondary')}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
