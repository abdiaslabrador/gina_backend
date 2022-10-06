require("dotenv").config();
const cors = require('cors')
import "reflect-metadata";
import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";

import { getDataSource, AppDataSource } from "./data-source";
import { Photo } from "./entities/Photo";
import {handleErrors} from './middlewares/errorHandler'
import {token_verify} from './middlewares/token'
import authRouter from './routers/authRouter'

const PORT =  process.env.PORT || 4000
const app = express();
//middleware
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRouter)

const { sign, decode, verify } = jsonwebtoken;  




const main = async () => {
  const appDataSource = await getDataSource();

  app.get("/api/photos",  token_verify, async (req: Request, res: Response, next:NextFunction) => {
      
    try {
      
      const photoRepository = AppDataSource.getRepository(Photo);
      const photos = await photoRepository.createQueryBuilder("photos").getMany();
      if (photos.length > 0) {
        return res.status(200).json(photos);
      } else {
        return res.status(200).json({msj:"No hay fotos"}); //contenido no encontrado
      }  

    } catch (error) {
      next(error)
    }
    

  });


  app.use(handleErrors)  
  app.listen(PORT, function () {
    console.log(`server running in port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
