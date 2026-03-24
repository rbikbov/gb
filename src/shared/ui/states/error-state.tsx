import type { FC } from 'react'

export interface ErrorStateProps {
  title?: string
  message?: string
  error?: Error
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  className?: string
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Error',
  message,
  error,
  action,
  className = '',
}) => {
  const getActionClasses = (variant: 'primary' | 'secondary') => {
    switch (variant) {
      case 'primary':
        return 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
      case 'secondary':
        return 'px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
      default:
        return 'px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
    }
  }

  const errorMessage =
    message || error?.message || 'An unexpected error occurred'

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>

      <p className="text-red-400 mb-4 max-w-md">{errorMessage}</p>

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
