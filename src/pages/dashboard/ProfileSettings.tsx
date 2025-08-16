import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  User,
  Mail,
  AtSign,
  Camera,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Palette,
  Eye,
  Lock
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '@/services/api'
import { toast } from 'sonner'
import { useTheme } from '@/hooks/useTheme'

const ProfileSettings = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const queryClient = useQueryClient()

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const profileUrl = `${window.location.origin}/${user?.username}`

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      })
    }
  }, [user])

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => userService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
      toast.success('Perfil atualizado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar perfil')
    },
  })

  const handleProfileUpdate = () => {
    updateProfileMutation.mutate({
      name: profileData.name || undefined,
      bio: profileData.bio || undefined,
      avatar: profileData.avatar || undefined,
    })
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      toast.success('URL copiada para a área de transferência!')
    } catch (error) {
      toast.error('Erro ao copiar URL')
    }
  }

  const handlePasswordUpdate = () => {
    if (!securityData.currentPassword || !securityData.newPassword) {
      toast.error('Preencha todos os campos')
      return
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('As senhas não conferem')
      return
    }

    if (securityData.newPassword.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    // Here you would call an API to update password
    toast.success('Senha atualizada com sucesso!')
    setSecurityData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Configurações do Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile URL */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>Seu Link Público</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border">
                  <code className="text-sm">{profileUrl}</code>
                </div>
                <Button onClick={handleCopyUrl} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button asChild>
                  <a href={profileUrl} target="_blank">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Este é o link que você pode compartilhar nas suas redes sociais
              </p>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name?.[0] || user?.username?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    <Camera className="w-4 h-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    JPG, GIF ou PNG. Máximo 1MB.
                  </p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    O email não pode ser alterado
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      value={user?.username || ''}
                      disabled
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    O username não pode ser alterado
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                />
                <p className="text-xs text-gray-500">
                  {profileData.bio.length}/160 caracteres
                </p>
              </div>

              <Button
                onClick={handleProfileUpdate}
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Tema e Aparência</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Modo Escuro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ative para reduzir o cansaço visual
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Cor do Perfil</h3>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    'from-purple-500 to-pink-500',
                    'from-blue-500 to-indigo-500',
                    'from-green-500 to-teal-500',
                    'from-yellow-500 to-orange-500',
                    'from-red-500 to-pink-500',
                    'from-gray-700 to-gray-900',
                  ].map((gradient, index) => (
                    <button
                      key={index}
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} hover:scale-110 transition-transform`}
                      onClick={() => {
                        // Update profile theme color
                        toast.success('Cor do perfil atualizada!')
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Configurações de Privacidade</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Perfil Público</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permite que outras pessoas encontrem seu perfil
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Aparecer nos Resultados de Busca</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seu perfil aparecerá quando alguém buscar seu nome
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Analytics Públicos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mostra o número de cliques nos seus links
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Segurança da Conta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Por segurança, você precisará fazer login novamente após alterar sua senha.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>

                <Button onClick={handlePasswordUpdate}>
                  Alterar Senha
                </Button>
              </div>

              {/* Account Info */}
              <div className="pt-6 border-t">
                <h3 className="font-medium mb-4">Informações da Conta</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Conta criada em:</span>
                    <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Último login:</span>
                    <span>Agora</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status da conta:</span>
                    <Badge variant="outline" className="text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ativa
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileSettings