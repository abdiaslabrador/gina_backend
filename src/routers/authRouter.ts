import express from "express";
import { authentication, userAuthenticated,  deleteTokenCookie } from "../controllers/authController";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'

const authRouter = express.Router();

//verifica si el usuario está autenticado
authRouter.get(
  "/",
  token_verify,
  userAuthenticated
);

authRouter.post(
  "/login",[
    check("email", {message: "Email mal escrito"}).isEmail(),
    check("password", {message: "Tiene que tener más de 6 caráteres"}).isLength({ min: 6 }),
  ]
  ,
  authentication
);

authRouter.get(
  "/delete-token",
  deleteTokenCookie
);

export default authRouter;