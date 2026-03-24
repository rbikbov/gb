import type { FC } from 'react'

import { Loader } from '../loader/loader'

export interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  className?: string
  overlay?: boolean
}

export const LoadingState: FC<LoadingStateProps> = ({
  size = 'lg',
  message,
  className = '',
  overlay = false,
}) => {
  const content = (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <Loader isLoading size={size} />
      {message && <p className="mt-4 text-gray-400 text-center">{message}</p>}
    </div>
  )

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {content}
      </div>
    )
  }

  return content
}
