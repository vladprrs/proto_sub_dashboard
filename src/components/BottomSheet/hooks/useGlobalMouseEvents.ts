import { useEffect, useCallback } from 'react'
import { domUtils } from '../utils'

interface UseGlobalMouseEventsProps {
  isDragging: boolean
  updateDrag: (clientY: number) => void
  endDrag: (onSnap: (height: number) => void) => void
}

export const useGlobalMouseEvents = ({
  isDragging,
  updateDrag,
  endDrag
}: UseGlobalMouseEventsProps): void => {
  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateDrag(e.clientY)
  }, [updateDrag])

  const handleMouseUp = useCallback(() => {
    endDrag(() => {}) // onSnap будет передан из компонента
  }, [endDrag])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      domUtils.lockBodyScroll()
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      domUtils.unlockBodyScroll()
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      domUtils.unlockBodyScroll()
    }
  }, [isDragging, handleMouseMove, handleMouseUp])
} 