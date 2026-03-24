import type { FC } from 'react'

import { ErrorState } from '@/shared/ui/states/error-state'

export interface UsersListErrorProps {
  error: Error
  onRetry?: () => void
}

export const UsersListError: FC<UsersListErrorProps> = ({ error, onRetry }) => {
  return (
    <ErrorState
      title="Failed to load users"
      error={error}
      action={
        onRetry
          ? {
              label: 'Retry',
              onClick: onRetry,
              variant: 'secondary',
            }
          : undefined
      }
    />
  )
}
