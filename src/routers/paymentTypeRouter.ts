import express from "express";
import { token_verify } from '../middlewares/token'
import { getNationalPayment, getForeignPayment } from '../controllers/register_box/paymentTypeController'

const paymentTypeRouter = express.Router();

paymentTypeRouter.get(
  "/national",
  token_verify,
  getNationalPayment
);

paymentTypeRouter.get(
  "/foreign",
  token_verify,
  getForeignPayment
);


export default paymentTypeRouter;