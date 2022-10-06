import express from "express";
import { authentication, userAuthenticated } from "../controllers/authController";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'

const authRouter = express.Router();
authRouter.get(
  "/",
  token_verify,
  userAuthenticated
);

authRouter.post(
  "/login",
  [
    check("email", "Error al escribir el email").isEmail(),
    check("password", "Tienen que ser más de 6 caracteres").isLength({min:6}),
  ],
  authentication
);



export default authRouter;
