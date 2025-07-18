import React from 'react'
import { BarChart3, MapPin, User } from 'lucide-react'

interface BottomNavigationProps {
  activeItem?: string
  onItemClick?: (itemId: string) => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeItem = 'overview', 
  onItemClick 
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full max-w-[586px] mx-auto h-[82px] bg-background/80 backdrop-blur-[20px] border-t border-gray-200 z-bottom-nav">
      <div className="flex items-center justify-around h-full pt-8">
        <button
          onClick={() => onItemClick?.('overview')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeItem === 'overview'
              ? 'text-primary' 
              : 'text-foreground-secondary hover:text-foreground'
          }`}
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-xs font-medium">Обзор</span>
        </button>
        
        <button
          onClick={() => onItemClick?.('routes')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeItem === 'routes'
              ? 'text-primary' 
              : 'text-foreground-secondary hover:text-foreground'
          }`}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-xs font-medium">Маршруты</span>
        </button>
        
        <button
          onClick={() => onItemClick?.('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeItem === 'profile'
              ? 'text-primary' 
              : 'text-foreground-secondary hover:text-foreground'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Профиль</span>
        </button>
      </div>
    </div>
  )
}

export default BottomNavigation 