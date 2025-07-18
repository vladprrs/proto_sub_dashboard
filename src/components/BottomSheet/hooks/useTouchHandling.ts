import { useState, useCallback } from 'react'
import { gestureUtils } from '../utils'

interface TouchState {
  touchStartY: number
  isTouchScrolling: boolean
}

interface UseTouchHandlingReturn {
  touchState: TouchState
  handleTouchStart: (clientY: number) => void
  handleTouchMove: (clientY: number, onExpand: () => void) => void
  resetTouchState: () => void
}

export const useTouchHandling = (): UseTouchHandlingReturn => {
  const [touchState, setTouchState] = useState<TouchState>({
    touchStartY: 0,
    isTouchScrolling: false
  })

  const handleTouchStart = useCallback((clientY: number) => {
    setTouchState({
      touchStartY: clientY,
      isTouchScrolling: false
    })
  }, [])

  const handleTouchMove = useCallback((clientY: number, onExpand: () => void) => {
    if (gestureUtils.isSwipeUp(touchState.touchStartY, clientY)) {
      onExpand()
      setTouchState(prev => ({ ...prev, isTouchScrolling: true }))
    }
  }, [touchState.touchStartY])

  const resetTouchState = useCallback(() => {
    setTouchState(prev => ({ ...prev, isTouchScrolling: false }))
  }, [])

  return {
    touchState,
    handleTouchStart,
    handleTouchMove,
    resetTouchState
  }
} 