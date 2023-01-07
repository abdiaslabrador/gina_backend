import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { 
          createProduct, deleteProduct, updateProduct, 
          searchBy, updateProductPrices, checkCant
       } from '../controllers/productController'

const productRouter = express.Router();

productRouter.get(
  "/updateprices",
  token_verify,
  updateProductPrices  
);

productRouter.post(
  "/create",
  token_verify,
  createProduct
);

productRouter.post(
  "/delete",
  token_verify,
  deleteProduct
);

productRouter.post(
  "/update",
  token_verify,
  updateProduct
);

productRouter.post(
  "/searchby",
  token_verify,
  searchBy
);

productRouter.post(
  "/checkcant",
  token_verify,
  checkCant
);




export default productRouter;