import { api } from '../lib/api'
import type {
  User,
  LinkType,
  PublicProfile,
  DashboardStats,
  Analytics,
  AuthResponse,
  RegisterData,
  LoginData,
  LinkFormData,
  UserUpdateData
} from '../types'

// Auth Services
export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },
}

// User Services
export const userService = {
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me')
    return response.data
  },

  updateMe: async (data: UserUpdateData): Promise<User> => {
    const response = await api.patch('/users/me', data)
    return response.data
  },

  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users')
    return response.data
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
}

// Link Services
export const linkService = {
  create: async (data: LinkFormData): Promise<LinkType> => {
    const response = await api.post('/links', data)
    return response.data
  },

  getAll: async (includeInactive = false): Promise<LinkType[]> => {
    const response = await api.get('/links', {
      params: { includeInactive }
    })
    return response.data
  },

  getById: async (id: string): Promise<LinkType> => {
    const response = await api.get(`/links/${id}`)
    return response.data
  },

  update: async (id: string, data: Partial<LinkType>): Promise<LinkType> => {
    const response = await api.patch(`/links/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/links/${id}`)
  },

  reorder: async (linkIds: string[]): Promise<void> => {
    await api.patch('/links/reorder', { linkIds })
  },

  getStats: async (id: string) => {
    const response = await api.get(`/links/${id}/stats`)
    return response.data
  },
}

// Dashboard Services
export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  getAnalytics: async () => {
    const response = await api.get('/dashboard/analytics')
    return response.data
  },

  getActivity: async (limit = 20): Promise<Analytics[]> => {
    const response = await api.get('/dashboard/activity', {
      params: { limit }
    })
    return response.data
  },
}

// Public Services
export const publicService = {
  getProfile: async (username: string): Promise<PublicProfile> => {
    const response = await api.get(`/public/profile/${username}`)
    return response.data
  },

  trackClick: async (linkId: string): Promise<{ url: string; title: string }> => {
    const response = await api.post(`/public/link/${linkId}/click`)
    return response.data
  },

  searchProfiles: async (query: string, limit = 10) => {
    const response = await api.get('/public/search', {
      params: { q: query, limit }
    })
    return response.data
  },
}

// Analytics Services
export const analyticsService = {
  create: async (data: {
    userId: string
    linkId?: string
    event: string
    ip?: string
    userAgent?: string
    country?: string
    city?: string
  }): Promise<Analytics> => {
    const response = await api.post('/analytics', data)
    return response.data
  },

  getUserAnalytics: async (): Promise<Analytics[]> => {
    const response = await api.get('/analytics/user')
    return response.data
  },

  getAll: async (): Promise<Analytics[]> => {
    const response = await api.get('/analytics')
    return response.data
  },
}