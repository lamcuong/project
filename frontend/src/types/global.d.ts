declare global {
  interface BaseResponse<T> {
    data: T
    success: boolean
    message?: string
    status?: number
  }
  interface BaseListResponse<T> {
    list: T[]

    paging: {
      current_page: number
      total_page: number
      limit: number
      count: number
    }
  }
  interface BaseParams<T = any> {
    limit?: number
    page?: number
    search?: string
    input?: T
    id?: string
  }
}
export {}
