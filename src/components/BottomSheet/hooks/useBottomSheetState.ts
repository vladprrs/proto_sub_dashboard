import { useState, useCallback } from 'react'

interface UseBottomSheetStateProps {
  defaultHeight: number
  minHeight: number
  maxHeight: number
}

interface BottomSheetState {
  currentHeight: number
  isExpanded: boolean
  isExpanding: boolean
}

interface BottomSheetActions {
  expandSheet: () => void
  collapseSheet: () => void
  setHeight: (height: number) => void
  toggleSheet: () => void
  setIsExpanding: (expanding: boolean) => void
}

export const useBottomSheetState = ({
  defaultHeight,
  minHeight,
  maxHeight
}: UseBottomSheetStateProps): BottomSheetState & BottomSheetActions => {
  const [currentHeight, setCurrentHeight] = useState(defaultHeight)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpanding, setIsExpanding] = useState(false)

  const expandSheet = useCallback(() => {
    setCurrentHeight(maxHeight)
    setIsExpanded(true)
    setIsExpanding(false)
  }, [maxHeight])

  const collapseSheet = useCallback(() => {
    setCurrentHeight(minHeight)
    setIsExpanded(false)
    setIsExpanding(false)
  }, [minHeight])

  const setHeight = useCallback((height: number) => {
    setCurrentHeight(Math.max(minHeight, Math.min(maxHeight, height)))
  }, [minHeight, maxHeight])

  const toggleSheet = useCallback(() => {
    if (isExpanded) {
      collapseSheet()
    } else {
      expandSheet()
    }
  }, [isExpanded, expandSheet, collapseSheet])

  return {
    currentHeight,
    isExpanded,
    isExpanding,
    expandSheet,
    collapseSheet,
    setHeight,
    toggleSheet,
    setIsExpanding
  }
} 