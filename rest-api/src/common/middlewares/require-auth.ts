import { Request, Response, NextFunction } from 'express';
import { NotAuthenticatedError } from '../errors/not-authenticated-error';
interface UserPayload {
  id: string;
  username: string;
  role: string;
}

// declare global {
//   namespace Express {
//     interface Request {
//       user: UserPayload;
//     }
//   }
// }

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) throw new NotAuthenticatedError();

  next();
};
