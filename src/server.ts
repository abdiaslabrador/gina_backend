require("dotenv").config();
import "reflect-metadata";
import express from "express";
import bcrypt  from "bcrypt";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getDataSource, AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Photo } from "./entities/Photo";

const app = express();
const { sign, decode, verify } = jsonwebtoken;
const saltRounds = 10;
function token_verify(req: Request, res: Response, next: NextFunction): void {
  /**
   * verficamos que el string que viene en el header sea un token
   */
  let bearerToken:string
  const bearerheader = req.headers['authorization']
  bearerToken = bearerheader ? bearerheader.split(" ")[1] : null
  if(bearerheader != "undefined" && bearerheader != null){
        req.token = bearerToken
        verify(req.token, process.env.secretkey)
   }  
   next()
}
function errorHandler(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void {
  let errorHandler = {
    JsonWebTokenError : (resp: Response, message?:string) =>{res.status(403).json({msj: "Error de token"})},
    default: (resp: Response) =>{res.status(500).json({msj: `Error en el servidor`})}
  }
  
  let handler : Function = errorHandler[error.name] || errorHandler.default
  handler(res)
}

//middleware
app.use(express.json());


const main = async () => {
  const appDataSource = await getDataSource();

  app.get("/api/photos",  token_verify, async (req: Request, res: Response) => {
      
    const photoRepository = AppDataSource.getRepository(Photo);
    const photos = await photoRepository.createQueryBuilder("photos").getMany();

    if (photos.length > 0) {
      return res.status(200).json(photos);
    } else {
      return res.status(200).json({msj:"No hay fotos"}); //contenido no encontrado
    }

  });

  app.post("/api/login", async (req: Request, res: Response, next:NextFunction) => {
    const {email, password} = req.body
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository
      .createQueryBuilder("user")
      // .addSelect(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
      // .from(User,"user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (user) {
       let result = await bcrypt.compare(password, user.password)
       if(result){
          const token:string = sign(
            JSON.stringify({
                name: user.name,
                last_name:user.last_name,
                birthday:user.birthday
              }),
            process.env.secretkey)
            return  res.status(200).json(token) 
          }
    };
        return res.status(204) //contenido no encontrado
  });

  app.use(errorHandler)  
  app.listen(3000, function () {
    console.log("server running in port 3000");
  });
};

main().catch((err) => {
  console.error(err);
});
