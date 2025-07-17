import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Settings } from 'lucide-react'

const FooterNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Главная' },
    { path: '/subscription', icon: Map, label: 'Подписка' },
    { path: '/settings', icon: Settings, label: 'Настройки' }
  ]

  return (
    <nav className="fixed bottom-0 w-mobile h-[82px] bg-background/80 backdrop-blur-[20px] z-bottom-nav border-t border-gray-200">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default FooterNav 