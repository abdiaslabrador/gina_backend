import express from "express";
import {token_verify} from '../middlewares/token'
import { 
          createBill
       } from '../controllers/documentController'

const documentRouter = express.Router();

documentRouter.post(
  "/create/bill",
//   token_verify,
  createBill
);


export default documentRouter;