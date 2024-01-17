import { useSearchParams } from 'next/navigation'
import { InvalidateQueryFilters, QueryClient } from '@tanstack/react-query'
export const useQueryString = () => {
  const searchParams = useSearchParams()
  const searchParamsObject = Object.fromEntries(searchParams.entries())
  return searchParamsObject
}

export const refresh = async (queryClient: QueryClient, keys: InvalidateQueryFilters[]) => {
  for (const key of keys) {
    await queryClient.invalidateQueries(key)
  }
}
