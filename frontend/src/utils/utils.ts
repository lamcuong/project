import { useSearchParams } from 'next/navigation'

export const useQueryString = () => {
  const searchParams = useSearchParams()
  const searchParamsObject = Object.fromEntries(searchParams.entries())
  return searchParamsObject
}
