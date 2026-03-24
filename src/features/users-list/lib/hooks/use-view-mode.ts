import { useState, useCallback } from 'react'

import { ViewMode, type ViewModeType } from '../../model/types'

export interface UseViewModeReturn {
  viewMode: ViewModeType
  setViewMode: (mode: ViewModeType) => void
  toggleViewMode: () => void
  isGridMode: boolean
  isTableMode: boolean
}

export function useViewMode(
  initialMode: ViewModeType = ViewMode.GRID
): UseViewModeReturn {
  const [viewMode, setViewModeState] = useState<ViewModeType>(initialMode)

  const setViewMode = useCallback((mode: ViewModeType) => {
    setViewModeState(mode)
  }, [])

  const toggleViewMode = useCallback(() => {
    setViewModeState(prev =>
      prev === ViewMode.GRID ? ViewMode.TABLE : ViewMode.GRID
    )
  }, [])

  const isGridMode = viewMode === ViewMode.GRID
  const isTableMode = viewMode === ViewMode.TABLE

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    isGridMode,
    isTableMode,
  }
}
