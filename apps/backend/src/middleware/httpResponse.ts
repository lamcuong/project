import { NextFunction, Request, Response } from 'express';

export const httpResponse = (req: Request, res: Response, next: NextFunction) => {
  res.unauth = ({ status = 401, message = "You're not authorized" } = {}) => {
    return res.status(status).error({
      message,
      status,
      success: false,
    });
  };
  res.error = ({ status = 422, message = 'Error' } = {}) => {
    return res.status(status).json({
      message,
      status,
      success: false,
    });
  };
  res.badreq = ({ status = 400, message = 'Bad request' } = {}) => {
    return res.status(status).error({
      message,
      status,
      success: false,
    });
  };
  res.internal = ({ status = 500, message = 'Internal' } = {}) => {
    return res.status(status).error({
      message,
      status,
      success: false,
    });
  };
  res.success = ({ status = 200, data, message = '', ...customField } = {}) => {
    return res.status(status).json({
      message,
      data,
      status,
      success: true,
      ...customField,
    });
  };
  next();
};
