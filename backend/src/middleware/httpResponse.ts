import { NextFunction, Request, Response } from 'express';

export const httpResponse = (req: Request, res: Response, next: NextFunction) => {
  res.unauth = ({ status = 401, data, message = "You're not authorized", errors } = {}) => {
    return res.status(status).error({
      errors,
      message,
      data,
      status,
    });
  };
  res.error = ({ status = 422, data, message = 'Error', errors } = {}) => {
    return res.status(status).json({
      errors,
      message,
      data,
      status,
    });
  };
  res.badreq = ({ status = 401, data, message = 'Bad request', errors } = {}) => {
    return res.status(status).error({
      errors,
      message,
      data,
      status,
    });
  };
  res.internal = ({ status = 500, data, message = 'Internal', errors } = {}) => {
    return res.status(status).error({
      errors,
      message,
      data,
      status,
    });
  };
  res.success = ({ status = 200, data, message = '', errors, ...customField } = {}) => {
    return res.status(status).json({
      errors,
      message,
      data,
      status,
      ...customField,
    });
  };
  next();
};
