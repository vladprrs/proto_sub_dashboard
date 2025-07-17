import React from 'react'

interface StoryCardProps {
  id: number
  image: string
  title: string
  onClick?: () => void
}

const StoryCard: React.FC<StoryCardProps> = ({ id, image, title, onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-24 h-30 border-2 border-primary rounded-2xl p-1 bg-white/90 backdrop-blur-[10px] relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold leading-tight drop-shadow-lg">
        {title}
      </div>
    </div>
  )
}

export default StoryCard 