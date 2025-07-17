import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { Tabs, TabsList, TabsTrigger } from '../components/Tabs'

const SubscribeLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleTabChange = (value: string) => {
    if (value === 'value') {
      navigate('/subscribe/value')
    } else if (value === 'modules') {
      navigate('/subscribe/modules')
    }
  }

  const getCurrentTab = () => {
    if (location.pathname.includes('/value')) return 'value'
    if (location.pathname.includes('/modules')) return 'modules'
    return 'value'
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Оформить подписку" 
        showBackButton 
        onBack={() => navigate('/subscribe')}
      />
      
      <div className="nav-panel">
        <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger value="value" className="flex-1">Выгода</TabsTrigger>
            <TabsTrigger value="modules" className="flex-1">Модули</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <main className="px-4 pb-20">
        <Outlet />
      </main>
    </div>
  )
}

export default SubscribeLayout 