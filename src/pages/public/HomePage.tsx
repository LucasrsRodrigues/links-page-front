import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  ArrowRight,
  Link2,
  BarChart3,
  Palette,
  Smartphone,
  Users,
  Globe,
  Zap,
  Shield,
  Heart
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const features = [
    {
      icon: <Link2 className="w-6 h-6" />,
      title: 'Links Ilimitados',
      description: 'Adicione quantos links quiser, organize como preferir'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Detalhados',
      description: 'Acompanhe cliques, origens e performance em tempo real'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Personalização Total',
      description: 'Temas, cores e ícones para deixar seu perfil único'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile First',
      description: 'Otimizado para todos os dispositivos e telas'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Super Rápido',
      description: 'Carregamento instantâneo e experiência fluida'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Seguro e Confiável',
      description: 'Seus dados protegidos com a melhor segurança'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Usuários Ativos' },
    { number: '1M+', label: 'Links Criados' },
    { number: '10M+', label: 'Cliques Mensais' },
    { number: '99.9%', label: 'Uptime' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4 px-4 py-1">
              ✨ A melhor plataforma de links do Brasil
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Todos seus links
              <br />
              em um só lugar
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Crie seu perfil personalizado, organize seus links importantes e
              compartilhe tudo com uma única URL. Simples, rápido e profissional.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg">
                Começar Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                <Search className="mr-2 w-5 h-5" />
                Explorar Perfis
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por @username ou nome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-center bg-white/80 backdrop-blur-sm border-gray-200 focus:border-purple-500"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ferramentas poderosas para criar o perfil de links perfeito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Como funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Em 3 passos simples, você estará online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Crie sua conta</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Registre-se gratuitamente e escolha seu username único
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Adicione seus links</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalize com cores, ícones e organize como preferir
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Compartilhe</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use seu link único em bio, stories e onde quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Junte-se a milhares de criadores que já estão usando o LinkTree
          </p>

          <Link to="/auth/register">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-xl">
              Criar Meu Perfil Grátis
              <Heart className="ml-2 w-6 h-6" />
            </Button>
          </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Sem cartão de crédito • Sem compromisso • 100% gratuito
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage