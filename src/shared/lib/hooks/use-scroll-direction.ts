import { useState, useEffect, useRef } from 'react'

export interface UseScrollDirectionOptions {
  /** Minimum scroll distance to trigger direction change */
  threshold?: number
  /** Enable scroll detection */
  enabled?: boolean
}

export interface ScrollDirection {
  /** Current scroll direction: 'up' | 'down' | 'none' */
  direction: 'up' | 'down' | 'none'
  /** Current scroll position */
  scrollY: number
  /** Scroll delta from last position */
  delta: number
}

/**
 * Hook for detecting scroll direction and position
 * Single responsibility: Scroll direction detection
 */
export function useScrollDirection(options: UseScrollDirectionOptions = {}) {
  const { threshold = 10, enabled = true } = options
  const [scrollState, setScrollState] = useState<ScrollDirection>({
    direction: 'none',
    scrollY: 0,
    delta: 0,
  })
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (!enabled) return

    let ticking = false

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY.current)

      // Filter out small movements
      if (delta < threshold) {
        ticking = false
        return
      }

      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'

      setScrollState({
        direction,
        scrollY: currentScrollY,
        delta,
      })

      lastScrollY.current = currentScrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold, enabled])

  return scrollState
}
