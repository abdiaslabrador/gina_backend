require("dotenv").config();
const cors = require('cors')
import "reflect-metadata";
import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";

import { getDataSource, AppDataSource } from "./data-source";
import {handleErrors} from './middlewares/errorHandler'
import {token_verify} from './middlewares/token'
import authRouter from './routers/authRouter'
import employeeRouter from './routers/employeeRouter'
import clientRouter from './routers/clientRouter'
import currencyRouter from './routers/currencyRouter'
import productRouter from './routers/productRouter'
import paymentTypeRouter from './routers/paymentTypeRouter'
import documentRouter from './routers/documentRouter'
import patientRouter from './routers/patientRouter'
import appointmentRouter from './routers/appointmentRouter'
import odontogramaRouter from './routers/odontogramaRouter'

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
app.use('/api/paymenttype', paymentTypeRouter)
app.use('/api/document', documentRouter)
app.use('/api/patient', patientRouter)
app.use('/api/appointment', appointmentRouter)
app.use('/api/odontograma', odontogramaRouter)

const main = async () => {
  const appDataSource = await getDataSource();
 
  app.use(handleErrors)  
  app.listen(PORT, function () {
    console.log(`server running in port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
