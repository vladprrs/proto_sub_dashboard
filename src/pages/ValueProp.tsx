import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const ValueProp: React.FC = () => {
  const navigate = useNavigate()

  const values = [
    {
      icon: '💰',
      title: 'Кешбэк 1 ₽/л на АЗС‑партнёрах'
    },
    {
      icon: '🎫',
      title: 'Доступ к купонам на мойки и кафе'
    },
    {
      icon: '⚙️',
      title: 'Гибкая настройка модулей — платите только за нужное'
    },
    {
      icon: '🚀',
      title: 'Ранний доступ к новым возможностям'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-section-title font-bold text-foreground mb-3">
          Базовая подписка — основа вашей экономии
        </h1>
        <p className="text-body text-foreground-secondary">
          Всего 149 ₽ в месяц и уже меньше тратите на топливо и сервисы в пути.
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
                <h3 className="text-card-title font-bold text-foreground">
                  {value.title}
                </h3>
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