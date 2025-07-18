import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../context/SubscriptionContext'

const Confirm: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useSubscription()
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedModules = state.subscription.selectedModules.filter(module => module.enabled)
  const basePrice = 149
  const modulesPrice = selectedModules.reduce((sum, module) => sum + module.price, 0)
  const totalPrice = basePrice + modulesPrice

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
        <p className="text-body text-foreground-secondary">Обрабатываем оплату…</p>
        <p className="text-small text-foreground-secondary">Это займёт пару секунд</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-section-title font-bold text-foreground mb-2">
          Проверьте заказ
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <p className="text-body font-medium text-foreground">Базовая подписка</p>
            <p className="text-small text-foreground-secondary">149 ₽/мес</p>
          </div>
          <span className="text-body font-medium text-primary">149 ₽</span>
        </div>
        
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
                <p className="text-small text-foreground-secondary">{module.price} ₽/мес</p>
              </div>
            </div>
            <span className="text-body font-medium text-primary">{module.price} ₽</span>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-body font-medium text-foreground">Итого:</span>
          <span className="text-card-title font-bold text-primary">{totalPrice} ₽/мес</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleConfirm}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Подтвердить и оплатить
        </button>
        
        <button
          onClick={() => navigate('/subscribe/modules')}
          className="w-full bg-gray-100 text-foreground py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Вернуться и изменить
        </button>
      </div>

      <div className="text-center">
        <p className="text-small text-foreground-secondary">
          Оплата спишется сразу. Отменить можно в любой момент.
        </p>
      </div>
    </div>
  )
}

export default Confirm 