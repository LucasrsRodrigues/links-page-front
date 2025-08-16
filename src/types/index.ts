export interface User {
  id: string
  email: string
  username: string
  name?: string
  bio?: string
  avatar?: string
  theme?: 'light' | 'dark'
  createdAt: string
  updatedAt?: string
}

export interface LinkType {
  id: string
  title: string
  url: string
  description?: string
  icon?: string
  color?: string
  position: number
  isActive: boolean
  clicks: number
  userId: string
  createdAt: string
  updatedAt?: string
  _count?: {
    Analytics: number
  }
}

// Alias para evitar conflito com React Router Link
export type Link = LinkType

export interface PublicProfile {
  id: string
  username: string
  name?: string
  bio?: string
  avatar?: string
  theme?: string
  profile?: {
    title?: string
    description?: string
    isPublic: boolean
  }
  links: LinkType[]
}

export interface DashboardStats {
  totalLinks: number
  activeLinks: number
  totalClicks: number
  recentClicks: number
  topLinks: Array<{
    id: string
    title: string
    clicks: number
    icon?: string
    color?: string
  }>
  growthRate: number
}

export interface Analytics {
  id: string
  event: 'click' | 'view' | 'share'
  linkId?: string
  country?: string
  city?: string
  userAgent?: string
  ip?: string
  createdAt: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface ApiError {
  message: string
  statusCode: number
  error?: string
}

export interface LinkFormData {
  title: string
  url: string
  description?: string
  icon?: string
  color?: string
}

export interface UserUpdateData {
  name?: string
  bio?: string
  avatar?: string
  theme?: 'light' | 'dark'
}

export interface RegisterData {
  email: string
  username: string
  password: string
  name?: string
}

export interface LoginData {
  email: string
  password: string
}