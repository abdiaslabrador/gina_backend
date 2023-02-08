import express from "express";
import {token_verify} from '../middlewares/token'
import { 
          createBill, getBillById, getBillByDate,
          cancelBill,
       } from '../controllers/register_box/documentController'

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

documentRouter.post(
  "/bill/cancel",
  token_verify,
  cancelBill
);

export default documentRouter;