import { Currency } from "../../entities/Currency";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getDataSource, AppDataSource } from "../../data-source";

const getCurrency = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const currencyRepository = AppDataSource.getRepository(Currency);
    let currency = await currencyRepository
        .createQueryBuilder("currency")
        .select([
          "currency.id",
          "currency.name",
          "currency.today_currency",
          "currency.createdAt",
          "currency.updateAt",
        ])
        .where("name != 'bolivar'")
        .andWhere("name != 'Bolivar'")
        .getOne();
      /*
        esta converción es necesaria para que el numero sea 
        un entero y no haya que realizar después casting
      */
      (currency)? currency.today_currency = Number(currency.today_currency) : null;
      return  res.status(200).json(currency)
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const updateCurrency = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const currencyRepository = AppDataSource.getRepository(Currency);
    let currency = await currencyRepository
        .createQueryBuilder("currency")
        .where("currency.id = :id", { id: req.body.id })
        .getOne();
      if(currency){

  
        currency.today_currency=req.body.today_currency
        
        

        await currencyRepository.save(currency);

        return  res.status(200).json({msg: "Divisa actualizado"})
      }
      else{
            return res.status(404).json({msg: "Divisa no se encuentra"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}












export  {updateCurrency, getCurrency};