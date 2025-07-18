import { useState, useCallback } from 'react'
import { gestureUtils } from '../utils'

interface ScrollState {
  lastScrollTop: number
  scrollDirection: 'up' | 'down' | null
}

interface UseScrollHandlingProps {
  isExpanded: boolean
  expandSheet: () => void
  collapseSheet: () => void
}

interface UseScrollHandlingReturn {
  handleScroll: (scrollTop: number, isTouchScrolling: boolean) => boolean
}

export const useScrollHandling = ({
  isExpanded,
  expandSheet,
  collapseSheet
}: UseScrollHandlingProps): UseScrollHandlingReturn => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    lastScrollTop: 0,
    scrollDirection: null
  })

  const handleScroll = useCallback((scrollTop: number, isTouchScrolling: boolean) => {
    const direction = gestureUtils.getScrollDirection(scrollTop, scrollState.lastScrollTop)
    
    setScrollState({
      lastScrollTop: scrollTop,
      scrollDirection: direction
    })

    // Если шторка не развернута и скролл вверх, разворачиваем
    if (!isExpanded && direction === 'up' && scrollTop <= 0 && !isTouchScrolling) {
      expandSheet()
      return true // сигнал для сброса скролла
    }

    // Если шторка развернута и скролл вниз до верха, сворачиваем
    if (isExpanded && direction === 'down' && scrollTop <= 0) {
      collapseSheet()
      return true // сигнал для сброса скролла
    }

    return false
  }, [isExpanded, scrollState.lastScrollTop, expandSheet, collapseSheet])

  return {
    handleScroll
  }
} 