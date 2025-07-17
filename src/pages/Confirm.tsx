import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../context/SubscriptionContext'

const Confirm: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useSubscription()
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedModules = state.subscription.selectedModules.filter(module => module.enabled)
  const totalPrice = selectedModules.reduce((sum, module) => sum + module.price, 0)

  const handleConfirm = async () => {
    setIsProcessing(true)
    
    // Имитация обработки платежа
    setTimeout(() => {
      setIsProcessing(false)
      navigate('/subscription')
    }, 3000)
  }

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-body text-foreground-secondary">Please wait...</p>
        <p className="text-small text-foreground-secondary">Обрабатываем ваш платеж</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-section-title font-bold text-foreground mb-2">
          Подтверждение заказа
        </h1>
        <p className="text-body text-foreground-secondary">
          Проверьте выбранные модули и сумму
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4">
        <h2 className="text-card-title font-bold text-foreground">Выбранные модули:</h2>
        
        {selectedModules.map((module) => (
          <div key={module.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">
                  {module.id === 'navigation-pro' && '🚗'}
                  {module.id === 'social-plus' && '👥'}
                  {module.id === 'offline-plus' && '📱'}
                </span>
              </div>
              <div>
                <p className="text-body font-medium text-foreground">{module.name}</p>
                <p className="text-small text-foreground-secondary">{module.description}</p>
              </div>
            </div>
            <span className="text-body font-medium text-primary">{module.price} ₽</span>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-body font-medium text-foreground">Сумма в месяц:</span>
          <span className="text-card-title font-bold text-primary">{totalPrice} ₽</span>
        </div>
        <p className="text-small text-foreground-secondary">
          Списание будет происходить ежемесячно
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Подтвердить
        </button>
        
        <button
          onClick={() => navigate('/subscribe/modules')}
          className="w-full bg-gray-100 text-foreground py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Назад к выбору
        </button>
      </div>
    </div>
  )
}

export default Confirm 