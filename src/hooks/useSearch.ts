import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { publicService } from '../services/api'
import { useDebounce } from './useDebounce'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => publicService.searchProfiles(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  })

  return {
    query,
    setQuery,
    results,
    isLoading,
  }
}