interface LoaderProps {
  isLoading: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Loader({
  isLoading,
  className = '',
  size = 'md',
}: LoaderProps) {
  if (!isLoading) return null

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={`
      absolute inset-0 backdrop-blur
      flex items-center justify-center
      z-50 pointer-events-none
      ${className}
    `}
    >
      <div className="flex flex-col items-center gap-2 sticky top-45 bottom-45">
        <div
          className={`
          animate-spin rounded-full border-2 border-gray-300
          border-t-blue-600
          ${sizeClasses[size]}
        `}
        />
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    </div>
  )
}
