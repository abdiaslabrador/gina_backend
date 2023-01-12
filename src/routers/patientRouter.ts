import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { createPatient, 
         updatePatient, 
        deletePatient,
        getPatientByCi,
        getPatientByNames,
        getPatientByBirthday,
        //  getPatientByEmail, getPatientByCiUpdate, getPatientByEmailUpdate
       } from '../controllers/odontology/patientController'

const patientRouter = express.Router();

patientRouter.post(
  "/create",
  token_verify,
  createPatient
);

patientRouter.post(
  "/delete",
  token_verify,
  deletePatient
);

patientRouter.post(
  "/update",
  token_verify,
  updatePatient
);

patientRouter.post(
  "/getbybirthday",
  token_verify,
  getPatientByBirthday
);

patientRouter.post( 
  "/getbynames",
  token_verify,
  getPatientByNames
);

patientRouter.post( //este se ultiliza para pregunta si ya la cédula existe al momento de crear un usuario en el front
  "/getbyci",
  token_verify,
  getPatientByCi
);
// patientRouter.post(
//   "/getbyemail",   //este se ultiliza para pregunta si ya la cédula existe al momento de crear un usuario en el front
//   token_verify,
//   getPatientByEmail
// );
// patientRouter.post(
//   "/getbyciupdate", //ese se ultiliza para pregunta si ya la cédula existe al momento de actualizar un usuario en el front
//   token_verify,
//   getPatientByCiUpdate
// );
// patientRouter.post(
//   "/getbyemailupdate", //ese se ultiliza para pregunta si ya la cédula existe al momento de actualizar un usuario en el front
//   token_verify,
//   getPatientByEmailUpdate
// );

export default patientRouter;