import { useState, useCallback } from 'react'
import { gestureUtils } from '../utils'

interface DragState {
  isDragging: boolean
  startY: number
  startHeight: number
}

interface UseDragHandlingProps {
  currentHeight: number
  setHeight: (height: number) => void
  minHeight: number
  maxHeight: number
}

interface DragHandlingActions {
  isDragging: boolean
  startDrag: (clientY: number) => void
  updateDrag: (clientY: number) => void
  endDrag: (onSnap: (height: number) => void) => void
}

export const useDragHandling = ({
  currentHeight,
  setHeight,
  minHeight,
  maxHeight
}: UseDragHandlingProps): DragHandlingActions => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startY: 0,
    startHeight: 0
  })

  const startDrag = useCallback((clientY: number) => {
    setDragState({
      isDragging: true,
      startY: clientY,
      startHeight: currentHeight
    })
  }, [currentHeight])

  const updateDrag = useCallback((clientY: number) => {
    if (!dragState.isDragging) return

    const newHeight = gestureUtils.calculateDragHeight(
      dragState.startY,
      clientY,
      dragState.startHeight,
      minHeight,
      maxHeight
    )
    setHeight(newHeight)
  }, [dragState, setHeight, minHeight, maxHeight])

  const endDrag = useCallback((onSnap: (height: number) => void) => {
    if (!dragState.isDragging) return

    setDragState(prev => ({ ...prev, isDragging: false }))
    
    const targetHeight = gestureUtils.getSnapHeight(currentHeight, minHeight, maxHeight)
    onSnap(targetHeight)
  }, [dragState.isDragging, currentHeight, minHeight, maxHeight])

  return {
    isDragging: dragState.isDragging,
    startDrag,
    updateDrag,
    endDrag
  }
} 