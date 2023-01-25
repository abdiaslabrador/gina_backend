import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { 
            getThee,
            createOrUpdateTooth
       } from '../controllers/odontology/odontogramaController'

const odontogramaRouter = express.Router();

odontogramaRouter.post(
  "/getthee",
//   token_verify,
  getThee
);

odontogramaRouter.post(
  "/tooth/createupdate",
//   token_verify,
  createOrUpdateTooth
);
export default odontogramaRouter;