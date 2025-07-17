import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const ValueProp: React.FC = () => {
  const navigate = useNavigate()

  const values = [
    {
      icon: '💰',
      title: 'Кешбэк до 10%',
      description: 'Возвращаем деньги за покупки в партнерских магазинах'
    },
    {
      icon: '🎫',
      title: 'Эксклюзивные купоны',
      description: 'Скидки и промокоды только для подписчиков'
    },
    {
      icon: '📱',
      title: 'Офлайн карты',
      description: 'Скачивайте карты и используйте без интернета'
    },
    {
      icon: '🚗',
      title: 'Расширенная навигация',
      description: 'Детальные маршруты и альтернативные пути'
    },
    {
      icon: '👥',
      title: 'Социальные функции',
      description: 'Делитесь маршрутами и находите друзей'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-section-title font-bold text-foreground mb-3">
          Что вы получите с подпиской
        </h1>
        <p className="text-body text-foreground-secondary">
          Расширенные возможности и эксклюзивные предложения
        </p>
      </div>

      <div className="space-y-4">
        {values.map((value, index) => (
          <Card key={index}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{value.icon}</span>
              </div>
              <div>
                <h3 className="text-card-title font-bold text-foreground mb-1">
                  {value.title}
                </h3>
                <p className="text-body text-foreground-secondary">
                  {value.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={() => navigate('/subscribe/modules')}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Далее
        </button>
      </div>
    </div>
  )
}

export default ValueProp 