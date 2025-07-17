import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import SubscribeLayout from './layouts/SubscribeLayout'

// Ленивая загрузка страниц
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SubscribeEntry = lazy(() => import('./pages/SubscribeEntry'))
const ValueProp = lazy(() => import('./pages/ValueProp'))
const ModuleSelect = lazy(() => import('./pages/ModuleSelect'))
const Confirm = lazy(() => import('./pages/Confirm'))
const SubscriptionMgmt = lazy(() => import('./pages/SubscriptionMgmt'))

// Компонент загрузки
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

// Обертка для ленивой загрузки
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={withSuspense(Dashboard)} />
      <Route path="/subscribe" element={withSuspense(SubscribeEntry)} />
      <Route path="/subscription" element={withSuspense(SubscriptionMgmt)} />
      
      {/* Маршруты с лейаутом подписки */}
      <Route path="/subscribe" element={<SubscribeLayout />}>
        <Route path="value" element={withSuspense(ValueProp)} />
        <Route path="modules" element={withSuspense(ModuleSelect)} />
        <Route path="confirm" element={withSuspense(Confirm)} />
      </Route>
    </Routes>
  )
}

export default AppRoutes 