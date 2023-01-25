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

const createOrUpdateTooth = async (req: Request, res: Response, next:NextFunction) => {
    try {
      await AppDataSource.transaction(async (transactionalEntityManager) => {

        const toothRepository = AppDataSource.getRepository(Tooth);
        const odontogramaRepository = AppDataSource.getRepository(Odontograma);
        
        let odont = await odontogramaRepository
          .createQueryBuilder("odont")
          .innerJoin("odont.patient", "patient")
          .where("patient.id = :id", { id: req.body.patient.id })
          .getOne();

        if(odont){
            let tooth = await toothRepository
            .createQueryBuilder("tooth")
            .leftJoinAndSelect("tooth.toothParts", "tooth.toothParts")
            .innerJoin("tooth.odontograma", "odontograma")
            .where("odontograma.id = :id", { id: odont.id })
            .andWhere("tooth.number = :tooth_number", { tooth_number: req.body.tooth?.number })
            .getOne();

            if(tooth){
              tooth.e=req.body.tooth?.e;
              tooth.m=req.body.tooth?.m;
              tooth.question=req.body.tooth?.question;
              tooth.line=req.body.tooth?.line;
              tooth.circle=req.body.tooth?.circle;
              tooth.ring=req.body.tooth?.ring;
              tooth.x=req.body.tooth?.x;
              if(!tooth.toothParts){
                tooth.toothParts=req.body.tooth?.toothParts;
              }else{
                tooth.toothParts.one = req.body.tooth?.toothParts?.one
                tooth.toothParts.two = req.body.tooth?.toothParts?.two
                tooth.toothParts.three = req.body.tooth?.toothParts?.three
                tooth.toothParts.four = req.body.tooth?.toothParts?.four
                tooth.toothParts.five = req.body.tooth?.toothParts?.five
              }
              
              await toothRepository.save(tooth)
              return  res.status(200).json({msg: "Diente actualizado"})
            }

        }else{
          odont = new Odontograma();
          odont.patient = {id : req.body.patient.id } as Patient;
          odontogramaRepository.save(odont);
        }
        req.body.tooth.odontograma = odont;
        await toothRepository.save(req.body.tooth)
        return  res.status(200).json({msg: "Diente creado"})
      })
     
    } catch (error) {
      console.log(error)
      return next(error)
    }
}

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
          createOrUpdateTooth,
        //   updateAppointment,
        //   deleteAppointment, 
        };