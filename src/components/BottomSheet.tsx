import React, { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'

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
  const [isDragging, setIsDragging] = useState(false)
  const [currentHeight, setCurrentHeight] = useState(defaultHeight)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isExpanding, setIsExpanding] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isTouchScrolling, setIsTouchScrolling] = useState(false)

  // Обработка начала касания/клика
  const handleStart = useCallback((clientY: number) => {
    setIsDragging(true)
    setStartY(clientY)
    setStartHeight(currentHeight)
  }, [currentHeight])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleStart(e.touches[0].clientY)
    setTouchStartY(e.touches[0].clientY)
    setIsTouchScrolling(false)
    e.preventDefault()
  }, [handleStart])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleStart(e.clientY)
    e.preventDefault()
  }, [handleStart])

  // Обработка движения
  const handleMove = useCallback((clientY: number) => {
    if (!isDragging) return

    const deltaY = startY - clientY
    const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + (deltaY / window.innerHeight) * 100))
    
    setCurrentHeight(newHeight)
  }, [isDragging, startY, startHeight, minHeight, maxHeight])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientY)
    e.preventDefault()
  }, [handleMove])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientY)
  }, [handleMove])

  // Обработка окончания касания/клика
  const handleEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)
    
    // Определяем, в какое состояние перейти
    const threshold = (minHeight + maxHeight) / 2
    const targetHeight = currentHeight > threshold ? maxHeight : minHeight
    
    setCurrentHeight(targetHeight)
    setIsExpanded(targetHeight === maxHeight)
    setIsExpanding(false)
  }, [isDragging, currentHeight, minHeight, maxHeight])

  const handleTouchEnd = useCallback(() => {
    handleEnd()
    setIsTouchScrolling(false)
  }, [handleEnd])

  const handleMouseUp = useCallback(() => {
    handleEnd()
  }, [handleEnd])

  // Обработка клика по dragger
  const handleDraggerClick = useCallback(() => {
    const targetHeight = isExpanded ? minHeight : maxHeight
    setCurrentHeight(targetHeight)
    setIsExpanded(!isExpanded)
    setIsExpanding(false)
  }, [isExpanded, minHeight, maxHeight])

  // Обработка touch событий контента
  const handleContentTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY)
    setIsTouchScrolling(false)
  }, [])

  const handleContentTouchMove = useCallback((e: React.TouchEvent) => {
    if (isExpanded) return // Если шторка развернута, позволяем обычный скролл
    
    const currentY = e.touches[0].clientY
    const deltaY = touchStartY - currentY
    
    // Если скролл вверх и шторка не развернута, разворачиваем её
    if (deltaY > 10 && !isExpanding) {
      e.preventDefault()
      setIsExpanding(true)
      setCurrentHeight(maxHeight)
      setIsExpanded(true)
      setIsTouchScrolling(true)
    }
  }, [isExpanded, isExpanding, touchStartY, maxHeight])

  // Обработка скролла контента
  const handleContentScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    
    // Определяем направление скролла
    const direction = scrollTop > lastScrollTop ? 'down' : 'up'
    setScrollDirection(direction)
    
    // Если шторка не развернута и скролл вверх, начинаем разворачивать шторку
    if (!isExpanded && direction === 'up' && scrollTop <= 0 && !isTouchScrolling) {
      setIsExpanding(true)
      setCurrentHeight(maxHeight)
      setIsExpanded(true)
      e.currentTarget.scrollTop = 0
      return
    }
    
    // Если шторка развернута и скролл вниз до самого верха, сворачиваем
    if (isExpanded && direction === 'down' && scrollTop <= 0) {
      setCurrentHeight(minHeight)
      setIsExpanded(false)
      setIsExpanding(false)
      e.currentTarget.scrollTop = 0
      return
    }
    
    setLastScrollTop(scrollTop)
  }, [isExpanded, lastScrollTop, minHeight, maxHeight, isTouchScrolling])

  // Обработка wheel события для разворачивания шторки
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (isExpanded) return // Если шторка уже развернута, позволяем обычный скролл
    
    // Если скролл вверх и шторка не развернута, разворачиваем её
    if (e.deltaY < 0) {
      e.preventDefault()
      setIsExpanding(true)
      setCurrentHeight(maxHeight)
      setIsExpanded(true)
    }
  }, [isExpanded, maxHeight])

  // Обработка глобальных событий мыши
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.overflow = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={sheetRef}
      className={cn(
        'absolute bottom-0 left-0 right-0 bg-background rounded-t-4xl z-bottom-sheet transition-all duration-300 ease-out',
        isDragging && 'transition-none',
        className
      )}
      style={{
        height: `${currentHeight}vh`,
        transform: `translateY(${isDragging ? 0 : 0}px)`
      }}
    >
      {/* Dragger */}
      <div
        className="w-10 h-1 bg-foreground/20 rounded-full mx-auto mt-4 cursor-pointer hover:bg-foreground/30 transition-colors select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onClick={handleDraggerClick}
      />

      {/* Контент */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto pb-20 scrollbar-hide"
        onScroll={handleContentScroll}
        onWheel={handleWheel}
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