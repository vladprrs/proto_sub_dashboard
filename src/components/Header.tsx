import React from 'react'
import { Menu, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBack }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-[20px] z-status-bar">
      <div className="flex items-center gap-3">
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center">
        {title ? (
          <h1 className="text-card-title font-bold text-foreground">{title}</h1>
        ) : (
          <div className="flex items-center">
            <span className="text-card-title font-bold text-primary">2GIS</span>
            <span className="text-body text-foreground-secondary ml-1">Subscription</span>
          </div>
        )}
      </div>
      
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <User className="w-5 h-5" />
      </button>
    </header>
  )
}

export default Header 