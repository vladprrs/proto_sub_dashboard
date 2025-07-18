import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Module {
  id: string
  name: string
  description: string
  price: number
  enabled: boolean
}

export interface Subscription {
  id?: string
  status: 'active' | 'frozen' | 'inactive'
  startDate?: string
  endDate?: string
  balance: number
  selectedModules: Module[]
}

interface SubscriptionState {
  subscription: Subscription
  isLoading: boolean
  error: string | null
}

type SubscriptionAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUBSCRIPTION'; payload: Subscription }
  | { type: 'TOGGLE_MODULE'; payload: string }
  | { type: 'FREEZE_SUBSCRIPTION' }
  | { type: 'UNFREEZE_SUBSCRIPTION' }

const initialState: SubscriptionState = {
  subscription: {
    status: 'inactive',
    balance: 0,
    selectedModules: [
      {
        id: 'navigation-pro',
        name: 'Навигация Pro',
        description: 'Езжайте быстрее и тише: без рекламы, оптимальный маршрут, Eco‑Route',
        price: 79,
        enabled: false
      },
      {
        id: 'social-plus',
        name: 'Social +',
        description: 'Друзья на карте — на ваших условиях: Ghost‑режим, реакции, уникальные хвосты',
        price: 49,
        enabled: false
      },
      {
        id: 'offline-plus',
        name: 'Offline +',
        description: 'Работает даже без интернета: Smart Download, ночные обновления карт',
        price: 59,
        enabled: false
      }
    ]
  },
  isLoading: false,
  error: null
}

const subscriptionReducer = (state: SubscriptionState, action: SubscriptionAction): SubscriptionState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_SUBSCRIPTION':
      return { ...state, subscription: action.payload }
    case 'TOGGLE_MODULE':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          selectedModules: state.subscription.selectedModules.map(module =>
            module.id === action.payload
              ? { ...module, enabled: !module.enabled }
              : module
          )
        }
      }
    case 'FREEZE_SUBSCRIPTION':
      return {
        ...state,
        subscription: { ...state.subscription, status: 'frozen' }
      }
    case 'UNFREEZE_SUBSCRIPTION':
      return {
        ...state,
        subscription: { ...state.subscription, status: 'active' }
      }
    default:
      return state
  }
}

interface SubscriptionContextType {
  state: SubscriptionState
  dispatch: React.Dispatch<SubscriptionAction>
  toggleModule: (moduleId: string) => void
  freezeSubscription: () => void
  unfreezeSubscription: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

interface SubscriptionProviderProps {
  children: ReactNode
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState)

  const toggleModule = (moduleId: string) => {
    dispatch({ type: 'TOGGLE_MODULE', payload: moduleId })
  }

  const freezeSubscription = () => {
    dispatch({ type: 'FREEZE_SUBSCRIPTION' })
  }

  const unfreezeSubscription = () => {
    dispatch({ type: 'UNFREEZE_SUBSCRIPTION' })
  }

  const value: SubscriptionContextType = {
    state,
    dispatch,
    toggleModule,
    freezeSubscription,
    unfreezeSubscription
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
} 