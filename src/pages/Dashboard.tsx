import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, BarChart3 } from 'lucide-react'
import BottomSheet from '../components/BottomSheet'
import DashboardContent from '../components/DashboardContent'
import BottomNavigation from '../components/BottomNavigation'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  // Данные для stories
  const stories = [
    { id: 1, image: '/extracted_dashboard/images/34f67ee241b18699fd7e3f7d00e2b36780572204.jpg', title: 'Заголовок сторис три строки' },
    { id: 2, image: '/extracted_dashboard/images/e42877ade1f2bd4cfde7c0b41fad26ebdad2f46e.jpg', title: 'Заголовок сторис три строки' },
    { id: 3, image: '/extracted_dashboard/images/3a11f310b9b132d5ce81bd19443d7d5fa0f543f7.jpg', title: 'Заголовок сторис три строки' },
    { id: 4, image: '/extracted_dashboard/images/40ceba486b7ff03fe9915708b46fafaa10915184.jpg', title: 'Заголовок сторис три строки' },
  ]

  // Данные для карточек
  const cards = [
    { 
      id: 1, 
      title: 'Новая подписка 2ГИС', 
      subtitle: 'Получите доступ к расширенным возможностям 2GIS', 
      image: '/extracted_dashboard/images/image_002.png', 
      type: 'large' as const,
      onClick: () => navigate('/subscribe')
    },
    { id: 2, title: 'Поесть', icon: '🍽️', type: 'meta' as const },
    { id: 3, title: 'Банкоматы', icon: '💳', type: 'meta' as const },
    { id: 4, title: 'Катки', icon: '⛸️', type: 'meta' as const },
    { id: 5, title: 'Xiaomi', subtitle: 'Реклама', type: 'ad' as const, adIcon: 'MI' },
    { id: 6, title: 'Салоны красоты', subtitle: '5671 место', icon: '💄', type: 'meta' as const },
    { id: 7, title: 'Пожить', icon: '🏨', type: 'meta' as const },
    { id: 8, title: 'Все рубрики', icon: '⋯', type: 'meta' as const },
  ]

  return (
    <div className="relative w-full max-w-[586px] h-screen mx-auto overflow-hidden">
      {/* Статус бар */}
      <div className="absolute top-0 left-0 right-0 h-5 bg-white/80 backdrop-blur-[20px] z-status-bar flex items-center justify-between px-2 text-xs font-semibold">
        <span>LTE</span>
        <span>09:41</span>
        <span>100%</span>
      </div>

      {/* Карта в фоне */}
      <div className="absolute top-0 left-0 w-full h-full z-map">
        <img 
          src="/extracted_dashboard/images/1787ae2a5cea9bf92b50b8f4cc908087feab9732.jpg" 
          alt="Карта 2GIS" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Управление картой */}
      <div className="absolute top-6 right-3 z-10 flex flex-col gap-2">
        <div className="w-12 h-12 bg-white/80 backdrop-blur-[20px] rounded-xl flex items-center justify-center shadow-lg">
          <BarChart3 className="w-6 h-6 text-foreground" />
        </div>
        <div className="w-12 h-12 bg-white/90 backdrop-blur-[20px] rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-7 h-7 border-2 border-primary rounded-full flex items-center justify-center font-semibold text-sm">
            2
          </div>
        </div>
        <div className="w-12 h-12 bg-white/80 backdrop-blur-[20px] rounded-xl flex items-center justify-center shadow-lg">
          <MapPin className="w-6 h-6 text-foreground" />
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet>
        <DashboardContent stories={stories} cards={cards} />
      </BottomSheet>

      {/* Нижняя навигация */}
      <BottomNavigation 
        activeItem="overview"
        onItemClick={(itemId) => console.log('Navigation clicked:', itemId)}
      />
    </div>
  )
}

export default Dashboard 