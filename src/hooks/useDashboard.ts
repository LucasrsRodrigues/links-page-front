import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/api'

export const useDashboard = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getStats,
  })

  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['dashboard', 'analytics'],
    queryFn: dashboardService.getAnalytics,
  })

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => dashboardService.getActivity(20),
  })

  return {
    stats,
    analytics,
    activity,
    isLoading: isLoadingStats || isLoadingAnalytics || isLoadingActivity,
  }
}