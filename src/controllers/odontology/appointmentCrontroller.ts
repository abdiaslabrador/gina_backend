import { Appointment } from "../../entities/Appointment";
import { AppointmentHistory } from "../../entities/AppointmentHistory";
import { Patient } from "../../entities/Patient";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";

const createAppointment = async (req: Request, res: Response, next:NextFunction) => {
    try {
      await AppDataSource.transaction(async (transactionalEntityManager) => {

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointmentHistoryRepository = AppDataSource.getRepository(AppointmentHistory);
      let appointmentHistory = await appointmentHistoryRepository
              .createQueryBuilder("aptHistory")
              .innerJoin("aptHistory.patient", "patient")
              .where("patient.id = :id", { id: req.body.patient.id })
              .getOne();

      if(appointmentHistory){
        const appointment = new Appointment();
        appointment.appointment_date=  req.body.appointment.today_date;
        appointment.reason=  req.body.appointment.reason;
        appointment.description= req.body.appointment.description;
        appointment.appointmentHistory = appointmentHistory;
        await appointmentRepository.save(appointment);
      }
      else{
        appointmentHistory = new AppointmentHistory();
        appointmentHistory.patient = {id : req.body.patient.id} as Patient;
        
        const appointment = new Appointment();
        appointment.appointment_date=  req.body.appointment.today_date;
        appointment.reason=  req.body.appointment.reason;
        appointment.description= req.body.appointment.description;
        appointment.appointmentHistory = appointmentHistory;

        await appointmentHistoryRepository.save(appointmentHistory);
        await appointmentRepository.save(appointment);

      }
      })
      return  res.status(200).json({msg: "Consulta creada exitosamente"})
     
    } catch (error) {
      console.log(error)
      return next(error)
    }
}

const getAppointments = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    let appointments = await appointmentRepository
        .createQueryBuilder("appointment")
        .innerJoin("appointment.appointmentHistory", "appointmentHistory")
        .innerJoin("appointmentHistory.patient", "patient")
        .where("patient.id = :id", { id: req.body.patient.id })
        .getMany();
  
        return  res.status(200).json(appointments)
      
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

// const deletePatient = async (req: Request, res: Response, next:NextFunction) => {

//   try {
//     const appointmentRepository = AppDataSource.getRepository(Appointment);
//     let patient = await appointmentRepository
//         .createQueryBuilder("patient")
//         .innerJoinAndSelect("patient.background", "background")
//         .where("patient.id = :id", { id: req.body.id })
//         .getOne();
    
//       if(patient){

//         patient.ci_rif=  alphabet_code(4) + patient.ci_rif;
//         await appointmentRepository.save(patient);
//         await appointmentRepository.softRemove(patient);

//         return  res.status(200).json({msg: "Paciente eliminado"})
//       }
//       else{
//             return res.status(404).json({msg: "Paciente no encontrado"})
//       }
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
  
// }

// const updatePatient = async (req: Request, res: Response, next:NextFunction) => {

//   try {
//     const appointmentRepository = AppDataSource.getRepository(Appointment);
//     let patient = await appointmentRepository
//         .createQueryBuilder("patient")
//         .innerJoinAndSelect("patient.background", "background")
//         .where("patient.id = :id", { id: req.body.patient.id })
//         // .where("patient.ci_rif = :ci_rif", { ci_rif: req.body.id })
//         .getOne();
    
//       if(patient){

//         patient.name=req.body.patient.name
//         patient.last_name=req.body.patient.last_name
//         patient.ci_rif=req.body.patient.ci_rif
//         patient.sex=req.body.patient.sex
//         patient.birthday=req.body.patient.birthday
//         patient.phone_number=req.body.patient.phone_number
//         patient.direction=req.body.patient.direction

//         patient.background.rm=req.body.patient.background.rm
//         patient.background.app=req.body.patient.background.app
//         patient.background.ah=req.body.patient.background.ah
//         patient.background.apf=req.body.patient.background.apf
//         patient.background.habits=req.body.patient.background.habits
//         await appointmentRepository.save(patient);
        
//         return  res.status(200).json({msg: "Paciente actualizado"})
//       }
//       else{
//             return res.status(404).json({msg: "Paciente no se encuentra"})
//       }
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
  
// }

export  { 
          createAppointment,
          getAppointments, 
          // updateAppointment,
          // deleteAppointment, 
        };