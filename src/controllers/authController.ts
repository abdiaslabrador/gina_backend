import { User } from "../entities/User";
import bcrypt  from "bcrypt";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getDataSource, AppDataSource } from "../data-source";
import {entriesValidatorHelper} from '../helpers/validators'
import {  validationResult } from "express-validator";
import {UserInf} from '../interfaces/user'

const { sign, decode, verify } = jsonwebtoken;


const authentication = async (req: Request, res: Response, next:NextFunction) => {
    let errorObject = entriesValidatorHelper(req)
    if(errorObject) return next(errorObject)

    const {email, password} = req.body
    try {
      const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository
          .createQueryBuilder("user")
          // .select(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
          .select(["user.id", "user.name", "user.last_name", "user.birthday", "user.password"])
          // .from(User,"user")
          .where("user.email = :email", { email: email })
          .getOne();
        
        if (user) {
          let equal_pass = await bcrypt.compare(password, user.password)
          if(equal_pass){
              delete user.password
              const token:string = sign(
                JSON.stringify({
                    user:user
                  }),
                process.env.SECRETKEY)
                return  res.status(200).json(token) 
              }
              else{
                return  res.status(400).json({msg:"Contraseña incorrecta"}) 
              }
        };
            return res.status(400).json({msg: "Email no encontrado"})  //contenido no encontrado
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
  }

  

const userAuthenticated = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user : UserInf = await userRepository
          .createQueryBuilder("user")
          .select(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
          // .from(User,"user")
          .where("user.id = :id", { id: req.user.id })
          .getOne();
        if(user){
          return res.status(200).json(user)
        }
        else{
          return res.status(401).json({msg: "No untenticado"})  //contenido no encontrado
        }
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
  export  {authentication, userAuthenticated}