import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { updateCurrency, getCurrency
       } from '../controllers/currencyController'

const currencyRouter = express.Router();

currencyRouter.post(
  "/update",
  token_verify,
  updateCurrency
);
currencyRouter.get(
    "/getcurrency",
    token_verify,
    getCurrency
  );


export default currencyRouter;