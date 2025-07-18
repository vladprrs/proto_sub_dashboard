import React, { useCallback } from 'react'
import { cn } from '../../lib/utils'
import { BOTTOM_SHEET_CONSTANTS } from './constants'
import { eventUtils, domUtils } from './utils'
import {
  useBottomSheetState,
  useDragHandling,
  useTouchHandling,
  useScrollHandling,
  useGlobalMouseEvents
} from './hooks'

interface BottomSheetProps {
  children: React.ReactNode
  className?: string
  minHeight?: number // в процентах от высоты экрана
  maxHeight?: number // в процентах от высоты экрана
  defaultHeight?: number // в процентах от высоты экрана
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  className,
  minHeight = 60,
  maxHeight = 100,
  defaultHeight = 60
}) => {
  // Состояние шторки
  const {
    currentHeight,
    isExpanded,
    isExpanding,
    expandSheet,
    collapseSheet,
    setHeight,
    toggleSheet,
    setIsExpanding
  } = useBottomSheetState({
    defaultHeight,
    minHeight,
    maxHeight
  })

  // Обработка перетаскивания
  const {
    isDragging,
    startDrag,
    updateDrag,
    endDrag
  } = useDragHandling({
    currentHeight,
    setHeight,
    minHeight,
    maxHeight
  })

  // Обработка touch событий
  const {
    touchState,
    handleTouchStart: handleTouchStartHook,
    handleTouchMove: handleTouchMoveHook,
    resetTouchState
  } = useTouchHandling()

  // Обработка скролла
  const { handleScroll } = useScrollHandling({
    isExpanded,
    expandSheet,
    collapseSheet
  })

  // Глобальные события мыши
  useGlobalMouseEvents({
    isDragging,
    updateDrag,
    endDrag
  })

  // Обработчики событий dragger
  const handleDraggerTouchStart = useCallback((e: React.TouchEvent) => {
    startDrag(eventUtils.getClientY(e))
    eventUtils.preventDefault(e)
  }, [startDrag])

  const handleDraggerTouchMove = useCallback((e: React.TouchEvent) => {
    updateDrag(eventUtils.getClientY(e))
    eventUtils.preventDefault(e)
  }, [updateDrag])

  const handleDraggerTouchEnd = useCallback(() => {
    endDrag((targetHeight) => {
      setHeight(targetHeight)
      if (targetHeight === maxHeight) {
        expandSheet()
      } else {
        collapseSheet()
      }
    })
  }, [endDrag, setHeight, maxHeight, expandSheet, collapseSheet])

  const handleDraggerMouseDown = useCallback((e: React.MouseEvent) => {
    startDrag(eventUtils.getClientY(e))
    eventUtils.preventDefault(e)
  }, [startDrag])

  const handleDraggerClick = useCallback(() => {
    toggleSheet()
  }, [toggleSheet])

  // Обработчики событий контента
  const handleContentTouchStart = useCallback((e: React.TouchEvent) => {
    handleTouchStartHook(eventUtils.getClientY(e))
  }, [handleTouchStartHook])

  const handleContentTouchMove = useCallback((e: React.TouchEvent) => {
    if (isExpanded) return // Если шторка развернута, позволяем обычный скролл
    
    handleTouchMoveHook(eventUtils.getClientY(e), () => {
      setIsExpanding(true)
      expandSheet()
    })
  }, [isExpanded, handleTouchMoveHook, setIsExpanding, expandSheet])

  const handleContentScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    const shouldResetScroll = handleScroll(scrollTop, touchState.isTouchScrolling)
    
    if (shouldResetScroll) {
      domUtils.resetScroll(e.currentTarget)
    }
  }, [handleScroll, touchState.isTouchScrolling])

  const handleContentWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (isExpanded) return // Если шторка уже развернута, позволяем обычный скролл
    
    // Если скролл вверх и шторка не развернута, разворачиваем её
    if (e.deltaY < 0) {
      eventUtils.preventDefault(e)
      setIsExpanding(true)
      expandSheet()
    }
  }, [isExpanded, setIsExpanding, expandSheet])

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 bg-background rounded-t-4xl z-bottom-sheet transition-all duration-300 ease-out',
        isDragging && 'transition-none',
        className
      )}
      style={{
        height: `${currentHeight}vh`
      }}
    >
      {/* Dragger */}
      <div
        className="w-10 h-1 bg-foreground/20 rounded-full mx-auto mt-4 cursor-pointer hover:bg-foreground/30 transition-colors select-none"
        onTouchStart={handleDraggerTouchStart}
        onTouchMove={handleDraggerTouchMove}
        onTouchEnd={handleDraggerTouchEnd}
        onMouseDown={handleDraggerMouseDown}
        onClick={handleDraggerClick}
      />

      {/* Контент */}
      <div
        className="h-full overflow-y-auto pb-20 scrollbar-hide"
        onScroll={handleContentScroll}
        onWheel={handleContentWheel}
        onTouchStart={handleContentTouchStart}
        onTouchMove={handleContentTouchMove}
        style={{
          // Блокируем скролл контента пока шторка разворачивается
          pointerEvents: isExpanding ? 'none' : 'auto'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default BottomSheet 