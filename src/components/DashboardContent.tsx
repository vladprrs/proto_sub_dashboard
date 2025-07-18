import React from 'react'
import { Search, Menu, Home, Briefcase, Bookmark } from 'lucide-react'
import StoryCard from './StoryCard'
import ContentCard from './ContentCard'

interface DashboardContentProps {
  stories: Array<{
    id: number
    image: string
    title: string
  }>
  cards: Array<{
    id: number
    title: string
    subtitle?: string
    image?: string
    icon?: string
    type: 'large' | 'meta' | 'ad'
    adIcon?: string
    onClick?: () => void
  }>
}

const DashboardContent: React.FC<DashboardContentProps> = ({ stories, cards }) => {
  return (
    <>
      {/* Навигационная панель */}
      <div className="sticky top-0 z-nav-panel bg-white shadow-lg rounded-t-2xl mb-4">
        <div className="px-4 pb-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-10 bg-gray-100 rounded-lg flex items-center gap-2 px-3 text-gray-500">
              <Search className="w-4 h-4" />
              <span className="text-sm">Поиск в Москве</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src="/extracted_dashboard/images/0235e2ec7b64e89803c2ebe320dbddf014cebf7a.jpg" 
                alt="Avatar" 
                className="w-6 h-6 rounded"
              />
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Menu className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Избранные маршруты */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-foreground/6 rounded-lg whitespace-nowrap">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-foreground/6 rounded-lg whitespace-nowrap">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium text-destructive">2 ч 45 мин</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-foreground/6 rounded-lg whitespace-nowrap">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium text-warning">45 мин</span>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              image={story.image}
              title={story.title}
              onClick={() => console.log('Story clicked:', story.id)}
            />
          ))}
        </div>
      </div>

      {/* Основной контент */}
      <div className="px-4">
        <h2 className="text-section-title font-bold text-foreground mb-4">Советы к месту</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Левая колонка */}
          <div className="space-y-3">
            {/* Большая карточка */}
            <ContentCard
              {...cards[0]}
              onClick={cards[0].onClick || (() => console.log('Large card clicked'))}
            />

            {/* Мета карточки */}
            {cards.slice(1, 4).map((card) => (
              <ContentCard
                key={card.id}
                {...card}
                onClick={card.onClick || (() => console.log('Card clicked:', card.id))}
              />
            ))}
          </div>

          {/* Правая колонка */}
          <div className="space-y-3">
            {cards.slice(4).map((card) => (
              <ContentCard
                key={card.id}
                {...card}
                onClick={card.onClick || (() => console.log('Card clicked:', card.id))}
              />
            ))}
          </div>
        </div>
      </div>

  
      {/* Отступ для нижней навигации */}
      <div className="h-20" />
    </>
  )
}

export default DashboardContent 