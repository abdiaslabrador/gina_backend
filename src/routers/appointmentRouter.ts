import express from "express";
import { check, body } from "express-validator";
import {token_verify} from '../middlewares/token'
import { createAppointment, 
         getAppointments,
         deleteAppointment, 
         updateAppointment, 
       } from '../controllers/odontology/appointmentCrontroller'

const appointmentRouter = express.Router();

appointmentRouter.post(
  "/create",
  token_verify,
  createAppointment
);

appointmentRouter.post(
  "/getappointments",
  token_verify,
  getAppointments
);

appointmentRouter.post(
  "/update",
  token_verify,
  updateAppointment
);

appointmentRouter.post(
  "/delete",
  token_verify,
  deleteAppointment
);

// appointmentRouter.post(
//   "/update",
//   token_verify,
//   updateAppointment
// );

export default appointmentRouter;