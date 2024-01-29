import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user.role)) return next();

    throw new NotAuthorizedError();
  };
};
