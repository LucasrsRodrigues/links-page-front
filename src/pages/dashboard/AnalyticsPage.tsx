import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  Globe,
  Smartphone,
  MousePointer,
  Eye,
  Calendar,
  Download
} from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { useLinks } from '@/hooks/useLinks'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const AnalyticsPage = () => {
  const { analytics, isLoading } = useDashboard()
  const { links } = useLinks()
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedLink, setSelectedLink] = useState<string>('all')

  // Mock data for demonstration
  const mockDailyStats = [
    { date: '2025-01-25', clicks: 45, views: 120 },
    { date: '2025-01-26', clicks: 52, views: 145 },
    { date: '2025-01-27', clicks: 38, views: 98 },
    { date: '2025-01-28', clicks: 67, views: 180 },
    { date: '2025-01-29', clicks: 81, views: 220 },
    { date: '2025-01-30', clicks: 73, views: 195 },
    { date: '2025-01-31', clicks: 95, views: 255 },
  ]

  const mockCountryStats = [
    { country: 'Brasil', count: 450, percentage: 65 },
    { country: 'Estados Unidos', count: 120, percentage: 17 },
    { country: 'Portugal', count: 80, percentage: 12 },
    { country: 'Argentina', count: 30, percentage: 4 },
    { country: 'Outros', count: 15, percentage: 2 },
  ]

  const mockDeviceStats = [
    { device: 'Mobile', count: 480, percentage: 68 },
    { device: 'Desktop', count: 180, percentage: 26 },
    { device: 'Tablet', count: 45, percentage: 6 },
  ]

  const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']

  const periods = [
    { value: '7d', label: 'Últimos 7 dias' },
    { value: '30d', label: 'Últimos 30 dias' },
    { value: '90d', label: 'Últimos 90 dias' },
    { value: '1y', label: 'Último ano' },
  ]

  const totalClicks = mockDailyStats.reduce((sum, day) => sum + day.clicks, 0)
  const totalViews = mockDailyStats.reduce((sum, day) => sum + day.views, 0)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe a performance dos seus links
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              +12% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              +8% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Clique</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalClicks / totalViews) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.1% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Links Ativos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {links.filter(l => l.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {links.length} links totais
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="links">Por Link</TabsTrigger>
          <TabsTrigger value="geography">Geografia</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Clicks and Views Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cliques e Visualizações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockDailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      name="Cliques"
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#EC4899"
                      strokeWidth={2}
                      name="Visualizações"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Links */}
          <Card>
            <CardHeader>
              <CardTitle>Links Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {links
                  .filter(l => l.isActive)
                  .sort((a, b) => b.clicks - a.clicks)
                  .slice(0, 5)
                  .map((link, index) => (
                    <div key={link.id} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{link.title}</p>
                        <p className="text-sm text-gray-500 truncate">{link.url}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{link.clicks}</p>
                        <p className="text-sm text-gray-500">cliques</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Performance por Link</CardTitle>
              <Select value={selectedLink} onValueChange={setSelectedLink}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os links</SelectItem>
                  {links.map((link) => (
                    <SelectItem key={link.id} value={link.id}>
                      {link.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={links.filter(l => l.isActive).slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="title"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cliques por País</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockCountryStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ country, percentage }) => `${country} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {mockCountryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Países</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCountryStats.map((country, index) => (
                    <div key={country.country} className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index] }} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{country.country}</span>
                          <span className="text-sm text-gray-500">{country.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: COLORS[index],
                              width: `${country.percentage}%`
                            }}
                          />
                        </div>
                      </div>
                      <span className="font-semibold">{country.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockDeviceStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ device, percentage }) => `${device} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {mockDeviceStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas por Dispositivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockDeviceStats.map((device, index) => (
                    <div key={device.device} className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS[index] + '20' }}>
                        {device.device === 'Mobile' && <Smartphone className="w-6 h-6" style={{ color: COLORS[index] }} />}
                        {device.device === 'Desktop' && <Globe className="w-6 h-6" style={{ color: COLORS[index] }} />}
                        {device.device === 'Tablet' && <Calendar className="w-6 h-6" style={{ color: COLORS[index] }} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{device.device}</span>
                          <span className="text-sm text-gray-500">{device.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: COLORS[index],
                              width: `${device.percentage}%`
                            }}
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {device.count} cliques
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsPage