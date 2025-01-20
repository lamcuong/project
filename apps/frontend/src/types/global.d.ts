declare global {
  interface BaseResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    status?: number;
  }
  interface BaseListResponse<T> {
    list: T[];

    paging: {
      current_page: number;
      total_page: number;
      limit: number;
      count: number;
    };
  }
}
export {};
