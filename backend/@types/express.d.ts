import { Response as Res } from 'express';

declare global {
  export type ExpressResponse<T = any> = Res<API.BaseResponse<T>>;

  export type ExpressResponseList<T> = Res<API.BaseResponse<API.ResponseList<T>>>;

  namespace Express {
    interface Request {
      user: UserInterface;
    }

    interface IResponseBody<T = any, V = any> {
      status?: number;
      message?: string;
      data?: T;
      errors?: V;
    }

    interface Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>> {
      success: (p?: IResponseBody<ResBody>) => void;

      error: (p?: IResponseBody<ResBody>) => void;

      badreq: (p?: IResponseBody<ResBody>) => void;

      unauth: (p?: IResponseBody<ResBody>) => void;

      internal: (p?: IResponseBody<ResBody>) => void;
    }
  }
}
export {};
