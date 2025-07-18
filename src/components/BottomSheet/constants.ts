// Константы для BottomSheet
export const BOTTOM_SHEET_CONSTANTS = {
  // Пороги для определения жестов
  TOUCH_THRESHOLD: 10, // пикселей для определения свайпа
  SNAP_THRESHOLD_RATIO: 0.5, // соотношение для определения snap точки
  
  // Анимации
  TRANSITION_DURATION: 300, // миллисекунды
  TRANSITION_EASING: 'ease-out',
  
  // Z-индексы
  Z_INDEX: 1000,
  
  // Размеры dragger
  DRAGGER_WIDTH: 40, // пиксели
  DRAGGER_HEIGHT: 4, // пиксели
  
  // Отступы
  CONTENT_PADDING_BOTTOM: 80, // пиксели для нижней навигации
} as const

// Состояния шторки
export const SHEET_STATES = {
  COLLAPSED: 'collapsed',
  EXPANDED: 'expanded',
  DRAGGING: 'dragging',
  EXPANDING: 'expanding',
} as const

// Направления скролла
export const SCROLL_DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
} as const

// Типы жестов
export const GESTURE_TYPES = {
  DRAG: 'drag',
  SWIPE: 'swipe',
  SCROLL: 'scroll',
  WHEEL: 'wheel',
} as const 