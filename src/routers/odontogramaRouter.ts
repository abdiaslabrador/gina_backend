import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { 
            getThee
       } from '../controllers/odontology/odontogramaController'

const odontogramaRouter = express.Router();

odontogramaRouter.post(
  "/getthee",
//   token_verify,
  getThee
);

export default odontogramaRouter;