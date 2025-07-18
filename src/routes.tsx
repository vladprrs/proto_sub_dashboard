import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="/subscription" element={
        <Suspense fallback={<LoadingSpinner />}>
          <SubscriptionMgmt />
        </Suspense>
      } />
      
      {/* Маршруты подписки */}
      <Route path="/subscribe" element={
        <Suspense fallback={<LoadingSpinner />}>
          <SubscribeEntry />
        </Suspense>
      } />
      <Route path="/subscribe/value" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ValueProp />
        </Suspense>
      } />
      <Route path="/subscribe/modules" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ModuleSelect />
        </Suspense>
      } />
      <Route path="/subscribe/confirm" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Confirm />
        </Suspense>
      } />
    </Routes>
  )
}

export default AppRoutes 