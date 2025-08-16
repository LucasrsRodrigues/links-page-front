import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Link2,
  BarChart3,
  TrendingUp,
  Eye,
  Plus,
  ExternalLink,
  Users,
  MousePointer
} from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { useLinks } from '@/hooks/useLinks'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import LinkCard from '@/components/common/LinkCard'
import EmptyState from '@/components/common/EmptyState'

const DashboardHome = () => {
  const { stats, analytics, activity, isLoading } = useDashboard()
  const { links, isLoading: isLoadingLinks } = useLinks()
  const { user } = useAuth()

  if (isLoading || isLoadingLinks) {
    return (
      <div className="space-y-6">
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const recentLinks = links.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Olá, {user?.name || user?.username}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Aqui está um resumo da sua atividade
          </p>
        </div>

        <div className="flex space-x-3">
          <Link to={`/${user?.username}`} target="_blank">
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Perfil
            </Button>
          </Link>
          <Link to="/dashboard/links">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Link
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalLinks || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.activeLinks || 0} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalClicks || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.recentClicks || 0} esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.growthRate ? `+${stats.growthRate.toFixed(1)}%` : '0%'}
            </div>
            <p className="text-xs text-muted-foreground">
              vs. semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalClicks || 0}</div>
            <p className="text-xs text-muted-foreground">
              do perfil
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Links */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Links Recentes</CardTitle>
              <Link to="/dashboard/links">
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentLinks.length === 0 ? (
                <EmptyState
                  icon={<Link2 className="w-12 h-12" />}
                  title="Nenhum link ainda"
                  description="Crie seu primeiro link para começar"
                  action={{
                    label: 'Criar Link',
                    onClick: () => window.location.href = '/dashboard/links'
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {recentLinks.map((link) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      showActions={false}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Links Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.topLinks && stats.topLinks.length > 0 ? (
                <div className="space-y-3">
                  {stats.topLinks.slice(0, 5).map((link, index) => (
                    <div key={link.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{link.title}</p>
                        <p className="text-sm text-gray-500">
                          {link.clicks} cliques
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Adicione links para ver estatísticas
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              {activity && activity.length > 0 ? (
                <div className="space-y-3">
                  {activity.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1 text-sm">
                        <span className="capitalize">{item.event}</span>
                        {item.country && (
                          <span className="text-gray-500"> de {item.country}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma atividade recente
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/links">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Link
                </Button>
              </Link>

              <Link to="/dashboard/profile">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </Link>

              <Link to="/dashboard/analytics">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome