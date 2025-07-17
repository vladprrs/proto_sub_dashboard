// MSW handlers для API моков
// В реальном проекте здесь будут обработчики для MSW

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface SubscriptionData {
  id: string
  status: 'active' | 'frozen' | 'inactive'
  startDate: string
  endDate: string
  balance: number
  selectedModules: Array<{
    id: string
    name: string
    description: string
    price: number
    enabled: boolean
  }>
}

export interface PaymentData {
  amount: number
  currency: string
  modules: string[]
}

// Моковые данные
const mockSubscription: SubscriptionData = {
  id: 'sub_123456',
  status: 'active',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  balance: 1500,
  selectedModules: [
    {
      id: 'navigation-pro',
      name: 'Navigation Pro',
      description: 'Расширенная навигация',
      price: 299,
      enabled: true
    },
    {
      id: 'social-plus',
      name: 'Social +',
      description: 'Социальные функции',
      price: 199,
      enabled: false
    },
    {
      id: 'offline-plus',
      name: 'Offline +',
      description: 'Офлайн режим',
      price: 399,
      enabled: true
    }
  ]
}

// API функции
export const api = {
  // Получение данных подписки
  async getSubscription(): Promise<ApiResponse<SubscriptionData>> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      data: mockSubscription,
      success: true
    }
  },

  // Создание подписки
  async createSubscription(modules: string[]): Promise<ApiResponse<SubscriptionData>> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newSubscription: SubscriptionData = {
      ...mockSubscription,
      id: `sub_${Date.now()}`,
      status: 'active',
      selectedModules: mockSubscription.selectedModules.map(module => ({
        ...module,
        enabled: modules.includes(module.id)
      }))
    }
    
    return {
      data: newSubscription,
      success: true,
      message: 'Подписка успешно создана'
    }
  },

  // Обновление подписки
  async updateSubscription(updates: Partial<SubscriptionData>): Promise<ApiResponse<SubscriptionData>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedSubscription = { ...mockSubscription, ...updates }
    
    return {
      data: updatedSubscription,
      success: true,
      message: 'Подписка обновлена'
    }
  },

  // Обработка платежей
  async processPayment(paymentData: PaymentData): Promise<ApiResponse<{ transactionId: string }>> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      data: { transactionId: `txn_${Date.now()}` },
      success: true,
      message: 'Платеж успешно обработан'
    }
  },

  // Заморозка подписки
  async freezeSubscription(): Promise<ApiResponse<SubscriptionData>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const frozenSubscription = { ...mockSubscription, status: 'frozen' as const }
    
    return {
      data: frozenSubscription,
      success: true,
      message: 'Подписка заморожена'
    }
  },

  // Разморозка подписки
  async unfreezeSubscription(): Promise<ApiResponse<SubscriptionData>> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const activeSubscription = { ...mockSubscription, status: 'active' as const }
    
    return {
      data: activeSubscription,
      success: true,
      message: 'Подписка разморожена'
    }
  }
}

// Хуки для работы с API
export const useApi = () => {
  return {
    getSubscription: api.getSubscription,
    createSubscription: api.createSubscription,
    updateSubscription: api.updateSubscription,
    processPayment: api.processPayment,
    freezeSubscription: api.freezeSubscription,
    unfreezeSubscription: api.unfreezeSubscription
  }
} 