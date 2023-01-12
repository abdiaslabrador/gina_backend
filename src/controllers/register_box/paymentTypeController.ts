import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";
import {PaymentType} from "../../entities/PaymentType";

const getNationalPayment = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const currencyRepository = AppDataSource.getRepository(PaymentType);
    let nPayments = await currencyRepository
        .createQueryBuilder("payment")
        .innerJoinAndSelect("payment.currency", "currency")
        .where("payment.type = 'n'")
        .orWhere("payment.type = 'N'")
        .orderBy("payment.name")
        .getMany();
      
      return  res.status(200).json(nPayments)
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getForeignPayment = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const currencyRepository = AppDataSource.getRepository(PaymentType);
    let fPayments = await currencyRepository
        .createQueryBuilder("payment")
        .innerJoinAndSelect("payment.currency", "currency")
        .where("payment.type = 'f'")
        .orWhere("payment.type = 'F'")
        .orderBy("payment.name")
        .getMany();
      
      
      return  res.status(200).json(fPayments)
  } catch (error) {
    console.log(error)
    return next(error)
  }
}


export  {getNationalPayment, getForeignPayment};