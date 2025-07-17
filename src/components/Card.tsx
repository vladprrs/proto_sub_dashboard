import React from 'react'
import { cn } from '../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, onClick, selected = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 shadow-sm border transition-all duration-200',
        selected && 'border-primary bg-primary/5',
        onClick && 'cursor-pointer hover:shadow-md active:scale-95',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card 