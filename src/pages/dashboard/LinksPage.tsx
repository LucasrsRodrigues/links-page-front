import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Plus,
  Search,
  Filter,
  GripVertical,
  Eye,
  EyeOff,
  BarChart3
} from 'lucide-react'
import { useLinks } from '@/hooks/useLinks'
import LinkCard from '@/components/common/LinkCard'
import EmptyState from '@/components/common/EmptyState'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { linkColors, iconOptions } from '@/utils/themes'
import { toast } from 'sonner'
import type { LinkType } from '@/types'

const LinksPage = () => {
  const {
    links,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
    isLoading
  } = useLinks(true) // Include inactive links

  const [searchQuery, setSearchQuery] = useState('')
  const [showInactive, setShowInactive] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<LinkType | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: '',
    color: linkColors[0]
  })

  // Filter links
  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = showInactive ? true : link.isActive

    return matchesSearch && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      icon: '',
      color: linkColors[0]
    })
  }

  const handleCreate = () => {
    if (!formData.title || !formData.url) {
      toast.error('Título e URL são obrigatórios')
      return
    }

    // Validate URL
    try {
      new URL(formData.url.startsWith('http') ? formData.url : `https://${formData.url}`)
    } catch {
      toast.error('URL inválida')
      return
    }

    createLink({
      title: formData.title,
      url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
      description: formData.description || undefined,
      icon: formData.icon || undefined,
      color: formData.color
    })

    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (link: LinkType) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      icon: link.icon || '',
      color: link.color || linkColors[0]
    })
  }

  const handleUpdate = () => {
    if (!editingLink || !formData.title || !formData.url) {
      toast.error('Título e URL são obrigatórios')
      return
    }

    try {
      new URL(formData.url.startsWith('http') ? formData.url : `https://${formData.url}`)
    } catch {
      toast.error('URL inválida')
      return
    }

    updateLink({
      id: editingLink.id,
      data: {
        title: formData.title,
        url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
        description: formData.description || undefined,
        icon: formData.icon || undefined,
        color: formData.color
      }
    })

    setEditingLink(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este link?')) {
      deleteLink(id)
    }
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    updateLink({
      id,
      data: { isActive }
    })
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(filteredLinks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const linkIds = items.map(item => item.id)
    reorderLinks(linkIds)
  }

  const LinkForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título *</Label>
        <Input
          id="title"
          placeholder="Ex: Meu Instagram"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL *</Label>
        <Input
          id="url"
          placeholder="Ex: https://instagram.com/usuario"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descrição opcional..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ícone</Label>
          <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Escolher ícone" />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <div className="flex items-center space-x-2">
                    <span>🔗</span>
                    <span className="capitalize">{icon}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Cor</Label>
          <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {linkColors.map((color, index) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded bg-gradient-to-r ${color}`} />
                    <span>Cor {index + 1}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            if (editingLink) {
              setEditingLink(null)
            } else {
              setIsCreateDialogOpen(false)
            }
            resetForm()
          }}
        >
          Cancelar
        </Button>
        <Button onClick={editingLink ? handleUpdate : handleCreate}>
          {editingLink ? 'Atualizar' : 'Criar'} Link
        </Button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Meus Links
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie e organize seus links
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Link</DialogTitle>
            </DialogHeader>
            <LinkForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-inactive"
                checked={showInactive}
                onCheckedChange={setShowInactive}
              />
              <Label htmlFor="show-inactive" className="text-sm">
                Mostrar inativos
              </Label>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{filteredLinks.length} link{filteredLinks.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{links.filter(l => l.isActive).length} ativo{links.filter(l => l.isActive).length !== 1 ? 's' : ''}</span>
            </div>

            <Badge variant="outline">
              {links.reduce((sum, link) => sum + link.clicks, 0)} cliques totais
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Links List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredLinks.length === 0 ? (
        <EmptyState
          icon={<Plus className="w-16 h-16" />}
          title={links.length === 0 ? "Nenhum link criado" : "Nenhum link encontrado"}
          description={
            links.length === 0
              ? "Crie seu primeiro link para começar"
              : "Tente ajustar os filtros de busca"
          }
          action={
            links.length === 0
              ? {
                label: 'Criar Primeiro Link',
                onClick: () => setIsCreateDialogOpen(true)
              }
              : undefined
          }
        />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {filteredLinks.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${snapshot.isDragging ? 'opacity-75' : ''}`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>

                          <div className="flex-1">
                            <LinkCard
                              link={link}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                              onToggleActive={handleToggleActive}
                              onViewStats={(id) => console.log('View stats for:', id)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingLink} onOpenChange={(open) => !open && setEditingLink(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Link</DialogTitle>
          </DialogHeader>
          <LinkForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LinksPage