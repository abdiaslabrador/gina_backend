import { Patient } from "../../entities/Patient";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";
import { Tooth } from "../../entities/Tooth";
import { ToothParts } from "../../entities/ToothParts";
import { Odontograma } from "../../entities/Odontograma";


const getThee = async (req: Request, res: Response, next:NextFunction) => {
    
    try {
        const toothRepository = AppDataSource.getRepository(Tooth);
        let teeth = await toothRepository
        .createQueryBuilder("teeth")
        .leftJoinAndSelect("teeth.toothParts", "toothParts")
        .innerJoin("teeth.odontograma", "odontograma")
        .innerJoin("odontograma.patient", "patient")
        .where("patient.id = :id", { id: req.body.patient.id })
        .orderBy("number", "ASC")
        .getMany();
  
        return  res.status(200).json(teeth)
      
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

// const createAppointment = async (req: Request, res: Response, next:NextFunction) => {
//     try {
//       await AppDataSource.transaction(async (transactionalEntityManager) => {

//       const appointmentRepository = AppDataSource.getRepository(Appointment);
//       const appointmentHistoryRepository = AppDataSource.getRepository(AppointmentHistory);
//       let appointmentHistory = await appointmentHistoryRepository
//               .createQueryBuilder("aptHistory")
//               .innerJoin("aptHistory.patient", "patient")
//               .where("patient.id = :id", { id: req.body.patient.id })
//               .getOne();

//       if(appointmentHistory){
//         const appointment = new Appointment();
//         appointment.appointment_date=  req.body.appointment.today_date;
//         appointment.reason=  req.body.appointment.reason;
//         appointment.description= req.body.appointment.description;
//         appointment.appointmentHistory = appointmentHistory;
//         await appointmentRepository.save(appointment);
//       }
//       else{
//         appointmentHistory = new AppointmentHistory();
//         appointmentHistory.patient = {id : req.body.patient.id} as Patient;
        
//         const appointment = new Appointment();
//         appointment.appointment_date=  req.body.appointment.today_date;
//         appointment.reason=  req.body.appointment.reason;
//         appointment.description= req.body.appointment.description;
//         appointment.appointmentHistory = appointmentHistory;

//         await appointmentHistoryRepository.save(appointmentHistory);
//         await appointmentRepository.save(appointment);

//       }
//       })
//       return  res.status(200).json({msg: "Consulta creada exitosamente"})
     
//     } catch (error) {
//       console.log(error)
//       return next(error)
//     }
// }

// const deleteAppointment = async (req: Request, res: Response, next:NextFunction) => {

//   try {
//     const appointmentRepository = AppDataSource.getRepository(Appointment);
//     let appointment = await appointmentRepository
//         .createQueryBuilder("appointment")
//         .softDelete()
//         .where("appointment.id = :id", { id: req.body.id })
//         .andWhere("deleteAt is null")
//         .execute();
        
//         return  res.status(200).json({msg: "Consulta eliminada"})
      
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
  
// }

// const updateAppointment = async (req: Request, res: Response, next:NextFunction) => {

//   try {
//     const appointmentRepository = AppDataSource.getRepository(Appointment);
//     let appointment = await appointmentRepository
//         .createQueryBuilder("appointment")
//         .where("appointment.id = :id", { id: req.body.appointment.id })
//         .getOne();
        
//         if(appointment){
//           appointment.appointment_date = req.body.appointment.appointment_date
//           appointment.reason = req.body.appointment.reason
//           appointment.description = req.body.appointment.description
  
//           await appointmentRepository.save(appointment);
  
//           return  res.status(200).json({msg: "Consulta actualizado"})
//         }
//         else{
//               return res.status(404).json({msg: "Consulta no se encuentra"})
//         }
      
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
  
// }

export  { 
          getThee, 
        //   createAppointment,
        //   updateAppointment,
        //   deleteAppointment, 
        };