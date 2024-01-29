import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/express';

// interface UserPayload {
//   id: string;
//   username: string;
//   role: string;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user: UserPayload;
//     }
//   }
// }

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }
  try {
    const token = req.headers.authorization;

    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.user = payload;
  } catch (err) {
    console.log(err);
  }

  next();
};
