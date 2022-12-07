import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { createEmployee, updateEmployee, deleteEmployee,
         updateEmployeePassword, allEmployee, getEmployeeByCi,
         getEmployeeByEmail, getEmployeeByCiUpdate, getEmployeeByEmailUpdate
       } from '../controllers/employeeController'

const employeeRouter = express.Router();

employeeRouter.post(
  "/create",
  token_verify,
  createEmployee
);

employeeRouter.post(
  "/delete",
  token_verify,
  deleteEmployee
);

employeeRouter.post(
  "/update",
  token_verify,
  updateEmployee
);

employeeRouter.post(
  "/updatepassword",
  token_verify,
  updateEmployeePassword
);

employeeRouter.get(
  "/all",
  token_verify,
  allEmployee
);
employeeRouter.post( //este se ultiliza para pregunta si ya la cédula existe al momento de crear un usuario en el front
  "/getbyci",
  token_verify,
  getEmployeeByCi
);
employeeRouter.post(
  "/getbyemail",   //este se ultiliza para pregunta si ya la cédula existe al momento de crear un usuario en el front
  token_verify,
  getEmployeeByEmail
);
employeeRouter.post(
  "/getbyciupdate", //ese se ultiliza para pregunta si ya la cédula existe al momento de actualizar un usuario en el front
  token_verify,
  getEmployeeByCiUpdate
);
employeeRouter.post(
  "/getbyemailupdate", //ese se ultiliza para pregunta si ya la cédula existe al momento de actualizar un usuario en el front
  token_verify,
  getEmployeeByEmailUpdate
);

export default employeeRouter;