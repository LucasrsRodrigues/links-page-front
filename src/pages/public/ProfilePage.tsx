import { useParams } from 'react-router-dom'
import { usePublicProfile } from '@/hooks/usePublicProfile'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  Eye,
  Share2,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const { profile, isLoading, error, handleLinkClick } = usePublicProfile(username!)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile?.name || profile?.username} - LinkTree`,
          text: profile?.bio || `Confira os links de ${profile?.name || profile?.username}`,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copiado para a área de transferência!')
      }
    } catch (error) {
      toast.error('Erro ao compartilhar')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-md">
          {/* Profile skeleton */}
          <div className="text-center mb-8">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-64 mx-auto mb-4" />
            <Skeleton className="h-10 w-32 mx-auto" />
          </div>

          {/* Links skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Perfil não encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            O usuário @{username} não existe ou não está disponível
          </p>
          <Button onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  const theme = profile.theme || 'light'
  const bgClass = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 to-black text-white'
    : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'

  return (
    <div className={cn("min-h-screen py-8 px-4", bgClass)}>
      <div className="container mx-auto max-w-md">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white/20">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl">
              {profile.name?.[0] || profile.username[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold mb-2">
            {profile.name || `@${profile.username}`}
          </h1>

          {profile.name && (
            <p className="text-lg opacity-75 mb-2">
              @{profile.username}
            </p>
          )}

          {profile.bio && (
            <p className="text-sm opacity-75 mb-4 max-w-sm mx-auto">
              {profile.bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold">{profile.links.length}</div>
              <div className="text-xs opacity-75">Links</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">
                {profile.links.reduce((sum, link) => sum + link.clicks, 0)}
              </div>
              <div className="text-xs opacity-75">Cliques</div>
            </div>
          </div>

          {/* Share button */}
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="backdrop-blur-sm border-white/20"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {profile.links.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 opacity-50" />
              </div>
              <p className="opacity-75">Nenhum link adicionado ainda</p>
            </div>
          ) : (
            profile.links
              // .filter(link => link.isActive)
              // .sort((a, b) => a.position - b.position)
              .map((link) => (
                <Card
                  key={link.id}
                  className={cn(
                    "group relative overflow-hidden border-0 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                    "backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
                  )}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {/* Background gradient */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity",
                    link.color || "from-blue-500 to-purple-500"
                  )} />

                  <div className="relative p-4 flex items-center space-x-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center text-white",
                      link.color || "from-blue-500 to-purple-500"
                    )}>
                      {link.icon ? (
                        <span className="text-lg">🔗</span>
                      ) : (
                        <ExternalLink className="w-6 h-6" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {link.description}
                        </p>
                      )}

                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          {link.clicks}
                        </Badge>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </Card>
              ))
          )}
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-xs opacity-50 mb-2">
            Criado com
            <Heart className="w-3 h-3 inline mx-1" />
            no LinkTree
          </p>
          <Button variant="ghost" size="sm" asChild className="opacity-75 hover:opacity-100">
            <a href="/" target="_blank">
              Criar meu LinkTree
            </a>
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default ProfilePage