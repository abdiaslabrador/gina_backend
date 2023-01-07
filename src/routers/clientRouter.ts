import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { createClient, deleteClient, updateClient, 
         getClientByCi, getClientByCiUpdate
       } from '../controllers/clientController'

const clientRouter = express.Router();

clientRouter.post(
  "/create",
  token_verify,
  createClient
);

clientRouter.post(
  "/delete",
  token_verify,
  deleteClient
);

clientRouter.post(
  "/update",
  token_verify,
  updateClient
);

clientRouter.post(
  "/getbyci",
  token_verify,
  getClientByCi
);

clientRouter.post(
  "/getbyciupdate",
  token_verify,
  getClientByCiUpdate
);

export default clientRouter;