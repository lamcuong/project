import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { BaseResponse } from '@expense-management/shared';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';
export type RequestResponse<ResponseData> = AxiosResponse<ResponseData> & {
  error?: any;
};

const handlerError = (error: any): BaseResponse<any> => {
  return {
    success: false,
    message: error?.response?.data?.message,
    status: error?.response?.status,
    data: error?.response?.data,
  };
};

export const handleRequest = async <ResponseData>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<ResponseData> => {
  return axios
    .request<ResponseData>({
      timeout: 15000,
      ...config,
      url,
      params: {
        ...config?.params,
      },
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${getCookie('Authorization')}`,
      },
    })
    .then((r) => r.data)
    .catch((error) => {
      const errorResponse: any = handlerError(error);
      toast({
        title: errorResponse.message,
      });
      throw errorResponse;
    });
};
