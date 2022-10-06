import { UserInf } from "../interfaces/user";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: UserInf;
    }
  }
}

// Esta era la como vino pero no siver así
// declare namespace Express {
//     export interface Request {
//         token?: string,
//         user?: UserInf
//     }
//  }
