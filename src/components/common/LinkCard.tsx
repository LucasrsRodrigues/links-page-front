import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MoreHorizontal,
  Edit,
  Trash2,
  BarChart3,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { LinkType } from '@/types'

interface LinkCardProps {
  link: LinkType
  onEdit?: (link: LinkType) => void
  onDelete?: (id: string) => void
  onToggleActive?: (id: string, isActive: boolean) => void
  onViewStats?: (id: string) => void
  showActions?: boolean
  onClick?: (link: LinkType) => void
}

const LinkCard = ({
  link,
  onEdit,
  onDelete,
  onToggleActive,
  onViewStats,
  showActions = true,
  onClick,
}: LinkCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(link)
    }
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:shadow-lg",
        !link.isActive && "opacity-60",
        onClick && "cursor-pointer hover:scale-[1.02]"
      )}
      onClick={handleClick}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity",
        link.color || "from-blue-500 to-purple-500"
      )} />

      <div className="relative p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center text-white",
              link.color || "from-blue-500 to-purple-500"
            )}>
              {link.icon ? (
                <span className="text-lg">
                  {/* Icon mapping would go here */}
                  🔗
                </span>
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
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {link.clicks} cliques
                </span>
                {!link.isActive && (
                  <Badge variant="secondary" className="text-xs">
                    Inativo
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(link)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                )}
                {onViewStats && (
                  <DropdownMenuItem onClick={() => onViewStats(link.id)}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Estatísticas
                  </DropdownMenuItem>
                )}
                {onToggleActive && (
                  <DropdownMenuItem
                    onClick={() => onToggleActive(link.id, !link.isActive)}
                  >
                    {link.isActive ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Desativar
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Ativar
                      </>
                    )}
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(link.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </Card>
  )
}

export default LinkCard