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

employeeRouter.post(
  "/all",
  token_verify,
  allEmployee
);
employeeRouter.post(
  "/getbyci",
  token_verify,
  getEmployeeByCi
);
employeeRouter.post(
  "/getbyemail",
  token_verify,
  getEmployeeByEmail
);
employeeRouter.post(
  "/getbyciupdate",
  token_verify,
  getEmployeeByCiUpdate
);
employeeRouter.post(
  "/getbyemailupdate",
  token_verify,
  getEmployeeByEmailUpdate
);

export default employeeRouter;