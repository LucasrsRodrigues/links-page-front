import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Search, LogIn, UserPlus } from 'lucide-react'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Header */}
      {/* <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LinkTree
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </Link>

              <Link to="/auth/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>

              <Link to="/auth/register">
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <footer className="border-t bg-white/50 dark:bg-gray-900/50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 LinkTree. Feito com ❤️ para conectar pessoas.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

export default PublicLayout