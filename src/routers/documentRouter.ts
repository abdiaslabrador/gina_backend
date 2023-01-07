import express from "express";
import {token_verify} from '../middlewares/token'
import { 
          createBill, getBillById, getBillByDate
       } from '../controllers/documentController'

const documentRouter = express.Router();

documentRouter.post(
  "/bill/create",
  token_verify,
  createBill
);

documentRouter.post(
  "/bill/getbyid",
  token_verify,
  getBillById
);

documentRouter.post(
  "/bill/getbydate",
  token_verify,
  getBillByDate
);

export default documentRouter;