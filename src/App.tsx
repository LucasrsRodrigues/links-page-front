import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './lib/query-client'
import { Toaster } from 'sonner'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import AuthLayout from './components/layout/AuthLayout'
import DashboardLayout from './components/layout/DashboardLayout'

// Páginas Públicas
import HomePage from './pages/public/HomePage'
import ProfilePage from './pages/public/ProfilePage'
import SearchPage from './pages/public/SearchPage'

// Autenticação
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Dashboard
import DashboardHome from './pages/dashboard/DashboardHome'
import LinksPage from './pages/dashboard/LinksPage'
import AnalyticsPage from './pages/dashboard/AnalyticsPage'
import ProfileSettings from './pages/dashboard/ProfileSettings'

// Guards
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Páginas Públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path=":username" element={<ProfilePage />} />
          </Route>

          {/* Autenticação */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="links" element={<LinksPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  404
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Página não encontrada
                </p>
                <a
                  href="/"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Voltar ao início
                </a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        expand
        richColors
        closeButton
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App