import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { CustomRequest } from "../custom_type";

const { sign, decode, verify } = jsonwebtoken;


function token_verify(req: CustomRequest, res: Response, next: NextFunction): void {
    /**
     * verficamos que el string que viene en el header sea un token
     */
    let user : any = {}
    const {token} = req.cookies

    if(token){
          try {
            user = verify(token, process.env.SECRETKEY)
          } catch (error) {
            res.clearCookie('token');
            next({name:"JsonWebTokenError", msg: "token no válido" })       
          }
          req.user = user.user
          return next(); //importante colocar el retun para hacer el cambio al otro middleware

     }  
       next({name:"JsonWebTokenError", msg: "No hay token" })
  }

export {token_verify}