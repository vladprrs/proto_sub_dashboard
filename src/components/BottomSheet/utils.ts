import { BOTTOM_SHEET_CONSTANTS, SCROLL_DIRECTIONS } from './constants'

// Утилиты для работы с жестами
export const gestureUtils = {
  // Определяет направление скролла
  getScrollDirection: (currentScrollTop: number, lastScrollTop: number): 'up' | 'down' => {
    return currentScrollTop > lastScrollTop ? SCROLL_DIRECTIONS.DOWN : SCROLL_DIRECTIONS.UP
  },

  // Проверяет, является ли жест свайпом вверх
  isSwipeUp: (startY: number, currentY: number): boolean => {
    const deltaY = startY - currentY
    return deltaY > BOTTOM_SHEET_CONSTANTS.TOUCH_THRESHOLD
  },

  // Вычисляет новую высоту на основе перетаскивания
  calculateDragHeight: (
    startY: number,
    currentY: number,
    startHeight: number,
    minHeight: number,
    maxHeight: number
  ): number => {
    const deltaY = startY - currentY
    const heightDelta = (deltaY / window.innerHeight) * 100
    const newHeight = startHeight + heightDelta
    
    return Math.max(minHeight, Math.min(maxHeight, newHeight))
  },

  // Определяет целевую высоту для snap эффекта
  getSnapHeight: (currentHeight: number, minHeight: number, maxHeight: number): number => {
    const threshold = minHeight + (maxHeight - minHeight) * BOTTOM_SHEET_CONSTANTS.SNAP_THRESHOLD_RATIO
    return currentHeight > threshold ? maxHeight : minHeight
  }
}

// Утилиты для работы с DOM
export const domUtils = {
  // Блокирует скролл body
  lockBodyScroll: (): void => {
    document.body.style.overflow = 'hidden'
  },

  // Разблокирует скролл body
  unlockBodyScroll: (): void => {
    document.body.style.overflow = ''
  },

  // Сбрасывает скролл элемента
  resetScroll: (element: HTMLElement): void => {
    element.scrollTop = 0
  },

  // Проверяет, находится ли элемент в начале скролла
  isAtScrollTop: (element: HTMLElement): boolean => {
    return element.scrollTop <= 0
  }
}

// Утилиты для работы с событиями
export const eventUtils = {
  // Предотвращает стандартное поведение события
  preventDefault: (event: Event | React.SyntheticEvent): void => {
    event.preventDefault()
  },

  // Получает координату Y из события
  getClientY: (event: TouchEvent | MouseEvent | React.TouchEvent | React.MouseEvent): number => {
    if ('touches' in event) {
      return event.touches[0].clientY
    }
    return event.clientY
  }
}

// Утилиты для работы с анимациями
export const animationUtils = {
  // Проверяет, должна ли анимация быть отключена
  shouldDisableTransition: (isDragging: boolean): boolean => {
    return isDragging
  },

  // Получает CSS классы для анимации
  getTransitionClasses: (isDragging: boolean): string => {
    const baseClasses = 'transition-all duration-300 ease-out'
    return isDragging ? baseClasses.replace('transition-all', '') : baseClasses
  }
} 