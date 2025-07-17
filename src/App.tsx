import React from 'react'
import { SubscriptionProvider } from './context/SubscriptionContext'
import AppRoutes from './routes'

const App: React.FC = () => {
  return (
    <SubscriptionProvider>
      <div className="w-mobile h-screen mx-auto bg-background">
        <AppRoutes />
      </div>
    </SubscriptionProvider>
  )
}

export default App 