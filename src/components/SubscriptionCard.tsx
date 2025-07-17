import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

const SubscriptionCard: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="absolute bottom-[70vh] left-4 right-4 z-20">
      <div className="bg-white rounded-2xl p-6 shadow-xl backdrop-blur-[20px] border border-white/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-section-title font-bold text-foreground mb-1">
              Попробовать подписку
            </h2>
            <p className="text-body text-foreground-secondary">
              Получите доступ к расширенным возможностям 2GIS и экономьте на покупках
            </p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/subscribe')}
          className="w-full bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <span>Оформить подписку</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SubscriptionCard 