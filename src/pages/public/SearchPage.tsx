import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Users, ExternalLink } from 'lucide-react'
import { useSearch } from '@/hooks/useSearch'
import EmptyState from '@/components/common/EmptyState'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const { query, setQuery, results, isLoading } = useSearch()

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
    }
  }, [initialQuery, setQuery])

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Descobrir Perfis
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Encontre pessoas incríveis e seus links
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por @username ou nome..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-center"
            />
          </div>
        </div>

        {/* Results */}
        <div>
          {query.length === 0 ? (
            <EmptyState
              icon={<Search className="w-16 h-16" />}
              title="Digite algo para buscar"
              description="Use @username, nome ou qualquer termo para encontrar perfis"
            />
          ) : query.length < 3 ? (
            <EmptyState
              icon={<Search className="w-16 h-16" />}
              title="Digite pelo menos 3 caracteres"
              description="Continue digitando para ver os resultados"
            />
          ) : isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-3 w-full mt-4" />
                    <Skeleton className="h-6 w-20 mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<Users className="w-16 h-16" />}
              title="Nenhum perfil encontrado"
              description={`Não encontramos resultados para "${query}". Tente outras palavras-chave.`}
            />
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {results.length} perfil{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''} para "{query}"
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((user: any) => (
                  <Link key={user.username} to={`/${user.username}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name?.[0] || user.username[0]}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {user.name || `@${user.username}`}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              @{user.username}
                            </p>
                          </div>

                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                        </div>

                        {user.bio && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            {user.bio}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">
                            {user._count?.links || 0} links
                          </Badge>

                          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Ver perfil →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage