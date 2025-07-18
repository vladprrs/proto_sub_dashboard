import React from 'react'
import { SubscriptionProvider } from './context/SubscriptionContext'
import AppRoutes from './routes'

const App: React.FC = () => {
  return (
    <SubscriptionProvider>
      <div className="w-full max-w-[586px] h-screen mx-auto bg-background">
        <AppRoutes />
      </div>
    </SubscriptionProvider>
  )
}

export default App 