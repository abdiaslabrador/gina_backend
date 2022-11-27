import { Employee } from "../entities/Employee";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getDataSource, AppDataSource } from "../data-source";
import { entriesValidatorHelper } from "../helpers/validators";
import { validationResult } from "express-validator";
import { UserInf } from "../interfaces/user";

const { sign, decode, verify } = jsonwebtoken;

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isNotValid = entriesValidatorHelper(req);
  if (isNotValid) return next(isNotValid);
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(Employee);
    const user = await userRepository
      .createQueryBuilder("employee")
      // .select(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretary", "user.superuser", "user.createdAt", "user.updateAt"])
      // .select(["user.id", "user.name", "user.last_name", "user.birthday", "user.password"])
      // .from(User,"user")
      .where("employee.email = :email", { email: email })
      .getOne();

    if (user) {
      let equal_pass = await bcrypt.compare(password, user.password);
      if (equal_pass) {
        delete user.password;
        const token: string = sign(
          JSON.stringify({
            user: user,
          }),
          process.env.SECRETKEY
        );
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json(token);
      } else {
        return res
          .status(400)
          .json({ errorName: 400, msg: "Contraseña incorrecta" });
      }
    }
    return res.status(404).json({ errorName: 404, msg: "Email no encontrado" }); //contenido no encontrado
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const userAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(Employee);
    const user: UserInf = await userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.last_name",
        "user.ci_rif",
        "user.birthday",
        "user.phone_number",
        "user.direction",
        "user.email",
        "user.active",
        "user.secretary",
        "user.superuser",
        "user.createdAt",
        "user.updateAt",
      ])
      // .from(User,"user")
      .where("user.id = :id", { id: req.user.id })
      .getOne();
    if (user) {
      return res.status(200).json(user);
    } else {
      res.clearCookie('token');
      return next({name:"JsonWebTokenError", msg: "No autenticado" }); //No se encontrado el usuario pasado por las cookiess
      // return res.status(403).json({ errorName: 403, msg: "No autenticado" }); //No se encontrado el usuario pasado por las cookiess
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteTokenCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // res.cookie('token', '', { httpOnly:true})
    // const {token}= req.cookies
    // res.cookie('token', null, { path:'/', httpOnly:true, domain: 'localhost' })
    // res.cookie('title', 'geeksforgeeks', { path:'/', httpOnly:true, domain: 'localhost' });
    res.clearCookie("token");
    // res.clearCookie('token');
    return res.status(200).json("Cookie cleared");
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export { authentication, userAuthenticated, deleteTokenCookie };
