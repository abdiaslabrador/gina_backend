import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { 
          createProduct, deleteProduct, updateProduct, 
          searchByDescription, searchByCode, searchByRange
       } from '../controllers/productController'

const productRouter = express.Router();

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
  "/getbydescription",
  token_verify,
  searchByDescription
);

productRouter.post(
  "/getbycode",
  token_verify,
  searchByCode
);

productRouter.post(
  "/getbyrange",
  token_verify,
  searchByRange
);


export default productRouter;