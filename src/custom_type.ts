import { Request } from "express"
export interface CustomRequest extends Request {
  user: any // or any other type
}