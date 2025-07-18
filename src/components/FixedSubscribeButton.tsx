import React from 'react'
import { useNavigate } from 'react-router-dom'

interface FixedSubscribeButtonProps {
  className?: string
  selectedModules?: string[]
  modules?: Array<{ id: string; price: string }>
}

const FixedSubscribeButton: React.FC<FixedSubscribeButtonProps> = ({ 
  className = '', 
  selectedModules = [],
  modules = []
}) => {
  const navigate = useNavigate()

  const handleSubscribe = () => {
    navigate('/subscribe/confirm')
  }

  // Расчет общей стоимости
  const basePrice = 149
  const selectedModulesData = modules.filter(module => selectedModules.includes(module.id))
  const modulesPrice = selectedModulesData.reduce((total, module) => {
    const price = parseInt(module.price.replace('от ', ''))
    return total + price
  }, 0)
  const totalPrice = basePrice + modulesPrice

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-4 max-w-[586px] mx-auto ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-foreground-secondary">
          {selectedModules.length > 0 ? `${selectedModules.length} модуль${selectedModules.length === 1 ? '' : selectedModules.length < 5 ? 'а' : 'ей'} выбрано` : 'Базовый тариф'}
        </div>
        <div className="text-lg font-bold text-foreground">
          {totalPrice} ₽/мес
        </div>
      </div>
      <button
        onClick={handleSubscribe}
        className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary/90 transition-colors"
      >
        Оформить подписку
      </button>
    </div>
  )
}

export default FixedSubscribeButton 