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
import employeeRouter from './routers/employeeRouter'
import clientRouter from './routers/clientRouter'
import currencyRouter from './routers/currencyRouter'
import productRouter from './routers/productRouter'

import cookieParser from 'cookie-parser'

const PORT =  process.env.PORT || 4000
const app = express();
//middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/client', clientRouter)
app.use('/api/currency', currencyRouter)
app.use('/api/product', productRouter)

// const { sign, decode, verify } = jsonwebtoken;  




const main = async () => {
  const appDataSource = await getDataSource();
 
  app.get("/api/photos",   async (req: Request, res: Response, next:NextFunction) => {
      
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
