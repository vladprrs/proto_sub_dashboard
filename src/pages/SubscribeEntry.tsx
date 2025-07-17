import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs'
import Card from '../components/Card'
import { useSubscription } from '../context/SubscriptionContext'

const SubscribeEntry: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useSubscription()
  const [activeTab, setActiveTab] = useState('value')

  const handleSubscribe = () => {
    navigate('/subscribe/value')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Оформить подписку" />
      
      <main className="px-4 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="nav-panel">
            <TabsList className="w-full">
              <TabsTrigger value="value" className="flex-1">Выгода</TabsTrigger>
              <TabsTrigger value="modules" className="flex-1">Модули</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="value" className="mt-6">
            <div className="space-y-4">
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">💰</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Кешбэк до 10%</h3>
                    <p className="text-body text-foreground-secondary">Возвращаем деньги за покупки</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">🎫</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Эксклюзивные купоны</h3>
                    <p className="text-body text-foreground-secondary">Скидки только для подписчиков</p>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">📱</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Офлайн карты</h3>
                    <p className="text-body text-foreground-secondary">Работает без интернета</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="modules" className="mt-6">
            <div className="space-y-4">
              {state.subscription.selectedModules.map((module) => (
                <Card key={module.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-card-title font-bold text-foreground">{module.name}</h3>
                      <p className="text-body text-foreground-secondary">{module.description}</p>
                      <p className="text-body font-medium text-primary">{module.price} ₽/мес</p>
                    </div>
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs">+</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Кнопка оформления */}
        <div className="mt-8">
          <button
            onClick={handleSubscribe}
            className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Оформить
          </button>
        </div>
      </main>
    </div>
  )
}

export default SubscribeEntry 