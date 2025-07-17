import React from 'react'

interface ContentCardProps {
  id: number
  title: string
  subtitle?: string
  image?: string
  icon?: string
  type: 'large' | 'meta' | 'ad'
  adIcon?: string
  onClick?: () => void
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  id, 
  title, 
  subtitle, 
  image, 
  icon, 
  type, 
  adIcon, 
  onClick 
}) => {
  if (type === 'large') {
    return (
      <div className="bg-white rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={onClick}>
        <div className="p-4">
          <h3 className="text-card-title font-medium text-foreground mb-1">{title}</h3>
          <p className="text-body text-foreground-secondary">{subtitle}</p>
        </div>
        {image && (
          <div 
            className="h-32 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 cursor-pointer relative transition-transform hover:scale-[1.02]" onClick={onClick}>
      <h3 className="text-card-title font-medium text-foreground mb-1">{title}</h3>
      {subtitle && (
        <p className="text-body text-foreground-secondary mb-2">{subtitle}</p>
      )}
      {type === 'ad' ? (
        <div className="absolute bottom-3 right-3">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            {adIcon}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-3 right-3">
          <div className="w-8 h-8 bg-foreground/6 rounded-full flex items-center justify-center text-2xl">
            {icon}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentCard 