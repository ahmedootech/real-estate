export interface UserPayload {
  id: string;
  name: string;
  username: string;
  role: string;
}

// declare namespace Express {
//   export interface Request {
//     user: UserPayload;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}
