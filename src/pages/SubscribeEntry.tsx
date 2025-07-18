import React, { useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import FixedSubscribeButton from '../components/FixedSubscribeButton'
import { useSubscription } from '../context/SubscriptionContext'

const SubscribeEntry: React.FC = () => {
  const { state } = useSubscription()
  const [selectedModules, setSelectedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  // Данные модулей из TEXTS.MD
  const modules = [
    {
      id: 'navigation-pro',
      name: 'Навигация Pro',
      description: 'Езжайте быстрее и тише: без рекламы, оптимальный маршрут, Eco‑Route',
      price: 'от 79'
    },
    {
      id: 'social-plus',
      name: 'Social +',
      description: 'Друзья на карте — на ваших условиях: Ghost‑режим, реакции, уникальные хвосты',
      price: 'от 49'
    },
    {
      id: 'offline-plus',
      name: 'Offline +',
      description: 'Работает даже без интернета: Smart Download, ночные обновления карт',
      price: 'от 59'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Оформить подписку" />
      
      <main className="px-4 pb-32">
        {/* Секция выгоды */}
        <section className="mb-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title font-bold text-foreground mb-3">
                Экономьте на каждой поездке
              </h2>
              <p className="text-body text-foreground-secondary mb-6">
                Получайте кешбэк 1 ₽ за каждый литр бензина и дополнительные скидки в дороге.
              </p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">💰</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Кешбэк 1 ₽/л — автоматически в чеке</h3>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">🎫</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Купоны партнёров — ещё до 5 % выгоды</h3>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-card-title font-bold text-foreground">Ранний доступ к новым функциям</h3>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Секция модулей */}
        <section>
          <div className="space-y-6">
            <div>
              <h2 className="text-section-title font-bold text-foreground mb-3">
                Соберите подписку под себя
              </h2>
              <p className="text-body text-foreground-secondary mb-6">
                Подписка — это база + модули. Выбирайте только нужные функции.
              </p>
            </div>
            
            <div className="space-y-4">
              {modules.map((module) => {
                const isSelected = selectedModules.includes(module.id)
                return (
                  <Card 
                    key={module.id} 
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-card-title font-bold text-foreground mb-2">{module.name}</h3>
                        <p className="text-body text-foreground-secondary mb-2">{module.description}</p>
                        <p className="text-body font-medium text-primary">{module.price} ₽/мес</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isSelected 
                          ? 'bg-primary text-white' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        <span className="text-xs font-bold">
                          {isSelected ? '✓' : '+'}
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
            
            <div className="text-center text-body text-foreground-secondary mt-4">
              Базовый тариф 149 ₽/мес. Модули оплачиваются отдельно.
            </div>
          </div>
        </section>
      </main>

      {/* Фиксированная кнопка подписки */}
      <FixedSubscribeButton 
        selectedModules={selectedModules}
        modules={modules}
      />
    </div>
  )
}

export default SubscribeEntry 