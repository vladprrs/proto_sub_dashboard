import React from 'react'
import Header from '../components/Header'
import FooterNav from '../components/FooterNav'
import Card from '../components/Card'
import { useSubscription } from '../context/SubscriptionContext'

const SubscriptionMgmt: React.FC = () => {
  const { state, toggleModule, freezeSubscription, unfreezeSubscription } = useSubscription()

  const getStatusText = () => {
    switch (state.subscription.status) {
      case 'active': return 'Активна'
      case 'frozen': return 'Заморожена'
      case 'inactive': return 'Неактивна'
      default: return 'Неизвестно'
    }
  }

  const getStatusColor = () => {
    switch (state.subscription.status) {
      case 'active': return 'text-primary'
      case 'frozen': return 'text-warning'
      case 'inactive': return 'text-foreground-secondary'
      default: return 'text-foreground-secondary'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Моя подписка" />
      
      <main className="px-4 pb-20 space-y-6">
        {/* Статус подписки */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-card-title font-bold text-foreground">Статус подписки</h2>
                <p className={`text-body font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-body text-foreground-secondary">Баланс баллов</p>
                <p className="text-card-title font-bold text-primary">{state.subscription.balance}</p>
              </div>
            </div>
            
            {state.subscription.status === 'active' && (
              <button
                onClick={freezeSubscription}
                className="w-full bg-warning text-white py-3 px-6 rounded-xl font-medium hover:bg-warning/90 transition-colors"
              >
                Заморозить подписку
              </button>
            )}
            
            {state.subscription.status === 'frozen' && (
              <button
                onClick={unfreezeSubscription}
                className="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Разморозить подписку
              </button>
            )}
          </div>
        </Card>

        {/* Опции */}
        <div>
          <h2 className="text-card-title font-bold text-foreground mb-4">Опции</h2>
          <div className="space-y-3">
            {state.subscription.selectedModules.map((module) => (
              <Card key={module.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
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
        </div>

        {/* История транзакций */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-card-title font-bold text-foreground">История транзакций</h3>
              <p className="text-body text-foreground-secondary">Просмотр платежей</p>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Card>
      </main>
      
      <FooterNav />
    </div>
  )
}

export default SubscriptionMgmt 