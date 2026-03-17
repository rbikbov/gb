import { useMemo, useState } from 'react'
import { debounce } from '@/shared/lib/debounce'
import { Paginator } from '@/shared/ui'

export function UsersPaginator({
  limit,
  skip,
  total,
  onChange,
  showAllPages,
}: {
  limit: number
  skip: number
  total: number
  onChange: (newState: { skip: number; limit: number }) => void
  showAllPages: boolean
}) {
  const [localSkip, setLocalSkip] = useState(skip)
  const [prevSkip, setPrevSkip] = useState(skip)

  if (skip !== prevSkip) {
    setLocalSkip(skip)
    setPrevSkip(skip)
  }
  const debouncedOnChange = useMemo(
    () =>
      debounce((newState: { skip: number; limit: number }) => {
        onChange(newState)
      }, 1000),
    [onChange]
  )

  return (
    <Paginator
      limit={limit}
      skip={localSkip}
      total={total}
      onPageChange={newState => {
        setLocalSkip(newState.skip)
        debouncedOnChange({ skip: newState.skip, limit: newState.limit })
      }}
      showAllPages={showAllPages}
    />
  )
}
