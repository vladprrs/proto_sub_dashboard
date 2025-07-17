import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { useSubscription } from '../context/SubscriptionContext'

const ModuleSelect: React.FC = () => {
  const navigate = useNavigate()
  const { state, toggleModule } = useSubscription()

  const handleNext = () => {
    const hasSelectedModules = state.subscription.selectedModules.some(module => module.enabled)
    if (hasSelectedModules) {
      navigate('/subscribe/confirm')
    }
  }

  const totalPrice = state.subscription.selectedModules
    .filter(module => module.enabled)
    .reduce((sum, module) => sum + module.price, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-section-title font-bold text-foreground mb-2">
          Выберите модули
        </h1>
        <p className="text-body text-foreground-secondary">
          Подключите нужные вам возможности
        </p>
      </div>

      <div className="space-y-4">
        {state.subscription.selectedModules.map((module) => (
          <Card 
            key={module.id}
            selected={module.enabled}
            onClick={() => toggleModule(module.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {module.id === 'navigation-pro' && '🚗'}
                      {module.id === 'social-plus' && '👥'}
                      {module.id === 'offline-plus' && '📱'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">{module.name}</h3>
                    <p className="text-body text-foreground-secondary">{module.description}</p>
                  </div>
                </div>
                <p className="text-body font-medium text-primary">{module.price} ₽/мес</p>
              </div>
              
              <div className="ml-4">
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  module.enabled ? 'bg-primary' : 'bg-gray-200'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    module.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPrice > 0 && (
        <div className="bg-primary/10 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-body font-medium text-foreground">Итого в месяц:</span>
            <span className="text-card-title font-bold text-primary">{totalPrice} ₽</span>
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={handleNext}
          disabled={totalPrice === 0}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Далее
        </button>
      </div>
    </div>
  )
}

export default ModuleSelect 