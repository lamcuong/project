declare global {
  namespace API {
    interface BaseResponse<T> {
      message: string | string[];
      status?: boolean;
      data?: T;
    }
    interface Response<T extends any = any> {
      data?: T;
    }
    interface ResponseList<T extends any = any> extends BaseResponse<T> {
      rows?: T[];
      paging?: {
        currentPage: number;
        limit: number;
        totalPage: number;
        total: number;
      };
    }
  }
}
export {};
