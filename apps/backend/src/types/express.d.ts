import { Response as Res } from 'express';

declare global {
  export type ExpressResponse<T = unknown> = Res<API.BaseResponse<T>>;

  export type ExpressResponseList<T> = Res<
    API.BaseResponse<API.ResponseList<T>>
  >;

  namespace Express {
    interface Request {
      user: UserInterface;
    }

    interface IResponseBody<T = unknown, V = unknown> {
      status?: number;
      message?: string;
      data?: T;
      errors?: V;
      success?: boolean;
    }

    interface Response<ResBody = unknown> {
      success: (p?: IResponseBody<ResBody>) => void;

      error: (p?: IResponseBody<ResBody>) => void;

      badreq: (p?: IResponseBody<ResBody>) => void;

      unauth: (p?: IResponseBody<ResBody>) => void;

      internal: (p?: IResponseBody<ResBody>) => void;
    }
  }
}
export {};
