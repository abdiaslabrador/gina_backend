import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";

const { sign, decode, verify } = jsonwebtoken;


function token_verify(req: Request, res: Response, next: NextFunction): void {
    /**
     * verficamos que el string que viene en el header sea un token
     */
    let bearerToken:string
    let user : any = {}
    const bearerheader = req.headers['authorization']
    bearerToken = bearerheader ? bearerheader.split(" ")[1] : null
    if(bearerToken){
          try {
            user = verify(bearerToken, process.env.SECRETKEY)
          } catch (error) {
            next({name:"JsonWebTokenError", msg: "token no valido" })       
          }
          req.token = bearerToken
          req.user = user.user
          return next(); //importante colocar el retun para hacer el cambio al otro middleware

     }  
       next({name:"JsonWebTokenError", msg: "No hay token" })
  }

export {token_verify}