import { useMutation, useQuery } from '@tanstack/react-query'
import { authService, userService } from '../services/api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  // Get current user
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: userService.getMe,
    enabled: !!localStorage.getItem('token'),
    retry: false,
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Conta criada com sucesso!')
      navigate('/dashboard')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar conta')
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao fazer login')
    },
  })

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logout realizado com sucesso!')
    navigate('/auth/login')
  }

  const isAuthenticated = !!localStorage.getItem('token')

  return {
    user,
    isLoading,
    isAuthenticated,
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
  }
}