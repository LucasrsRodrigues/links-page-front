import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { linkService } from '../services/api'
import { toast } from 'sonner'
import type { Link } from '../types'

export const useLinks = (includeInactive = false) => {
  const queryClient = useQueryClient()

  // Get all links
  const { data: links = [], isLoading } = useQuery({
    queryKey: ['links', includeInactive],
    queryFn: () => linkService.getAll(includeInactive),
  })

  // Create link mutation
  const createMutation = useMutation({
    mutationFn: linkService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Link criado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao criar link')
    },
  })

  // Update link mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Link> }) =>
      linkService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Link atualizado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao atualizar link')
    },
  })

  // Delete link mutation
  const deleteMutation = useMutation({
    mutationFn: linkService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('Link excluído com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir link')
    },
  })

  // Reorder links mutation
  const reorderMutation = useMutation({
    mutationFn: linkService.reorder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('Ordem dos links atualizada!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erro ao reordenar links')
    },
  })

  return {
    links,
    isLoading,
    createLink: createMutation.mutate,
    updateLink: updateMutation.mutate,
    deleteLink: deleteMutation.mutate,
    reorderLinks: reorderMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isReordering: reorderMutation.isPending,
  }
}