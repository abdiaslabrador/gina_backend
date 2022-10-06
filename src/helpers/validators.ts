import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {  validationResult } from "express-validator";

function entriesValidatorHelper(req: Request): object | null{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return {name:"expressValidator",  errors: errors.array()}
    }else{
      return null
    }
}

export {entriesValidatorHelper}