import { useMutation, useQuery } from '@tanstack/react-query'
import { publicService } from '../services/api'
import { toast } from 'sonner'

export const usePublicProfile = (username: string) => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['public', 'profile', username],
    queryFn: () => publicService.getProfile(username),
    enabled: !!username,
    retry: false,
  })

  const clickMutation = useMutation({
    mutationFn: publicService.trackClick,
    onSuccess: (data) => {
      // Abrir link em nova aba
      window.open(data.url, '_blank')
    },
    onError: () => {
      toast.error('Erro ao abrir link')
    },
  })

  return {
    profile,
    isLoading,
    error,
    handleLinkClick: clickMutation.mutate,
    isClicking: clickMutation.isPending,
  }
}