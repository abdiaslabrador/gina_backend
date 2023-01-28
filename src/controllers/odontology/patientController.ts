import { Patient } from "../../entities/Patient";
import { PatientBackground } from "../../entities/PatientBackground";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";
import { alphabet_code } from "../../helpers/codeGenerator";

const createPatient = async (req: Request, res: Response, next:NextFunction) => {

    try {
      const patientRepository = AppDataSource.getRepository(Patient);
      let patient = await patientRepository
          .createQueryBuilder("patient")
          .where("patient.ci_rif = :ci_rif", { ci_rif: req.body.patient.ci_rif })
          .getOne();

      if(!patient){
        patient = new Patient();
        patient.name=req.body.patient.name
        patient.last_name=req.body.patient.last_name
        patient.ci_rif=req.body.patient.ci_rif
        patient.sex=req.body.patient.sex
        patient.birthday=req.body.patient.birthday
        patient.phone_number=req.body.patient.phone_number
        patient.direction=req.body.patient.direction

        let background = new PatientBackground();
        background.rm=req.body.patient.background.rm
        background.app=req.body.patient.background.app
        background.ah=req.body.patient.background.ah
        background.apf=req.body.patient.background.apf
        background.habits=req.body.patient.background.habits
        patient.background = background
        await patientRepository.save(patient);

        return  res.status(200).json({msg: "Paciente creado exitosamente"})
      }
      else{
        return res.status(400).json({msg: "Paciente ya existe"})
      }
          
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
}

const deletePatient = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    let patient = await patientRepository
        .createQueryBuilder("patient")
        .innerJoinAndSelect("patient.background", "background")
        .where("patient.id = :id", { id: req.body.id })
        .getOne();
    
      if(patient){

        patient.ci_rif=  alphabet_code(4) + patient.ci_rif;
        await patientRepository.save(patient);
        await patientRepository.softRemove(patient);

        return  res.status(200).json({msg: "Paciente eliminado"})
      }
      else{
            return res.status(404).json({msg: "Paciente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const updatePatient = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    let patient = await patientRepository
        .createQueryBuilder("patient")
        .innerJoinAndSelect("patient.background", "background")
        .where("patient.id = :id", { id: req.body.patient.id })
        // .where("patient.ci_rif = :ci_rif", { ci_rif: req.body.id })
        .getOne();
    
      if(patient){

        patient.name=req.body.patient.name
        patient.last_name=req.body.patient.last_name
        patient.ci_rif=req.body.patient.ci_rif
        patient.sex=req.body.patient.sex
        patient.birthday=req.body.patient.birthday
        patient.phone_number=req.body.patient.phone_number
        patient.direction=req.body.patient.direction

        patient.background.rm=req.body.patient.background.rm
        patient.background.app=req.body.patient.background.app
        patient.background.ah=req.body.patient.background.ah
        patient.background.apf=req.body.patient.background.apf
        patient.background.habits=req.body.patient.background.habits
        await patientRepository.save(patient);
        
        return  res.status(200).json({msg: "Paciente actualizado"})
      }
      else{
            return res.status(404).json({msg: "Paciente no se encuentra"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const getPatientByBirthday = async (req: Request, res: Response, next:NextFunction) => {

  try {
      const patient = await AppDataSource
      .createQueryBuilder(Patient, "patient")
      .innerJoinAndSelect("patient.background", "background")
      .where(`DATE_TRUNC('day', patient.birthday) = '${req.body.birthday}'`)
      .getMany();

      return  res.status(200).json(patient)
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getPatientByCi = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    let patient = await patientRepository
        .createQueryBuilder("patient")
        .innerJoinAndSelect("patient.background", "background")
        .where("patient.ci_rif = :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(patient){
        return  res.status(200).json(patient)
      }
      else{
        return res.status(404).json({msg: "Paciente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getPatientByNames = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    let patient = await patientRepository
        .createQueryBuilder("patient")
        .innerJoinAndSelect("patient.background", "background")
        .where(`LOWER(unaccent(name)) like LOWER(unaccent('%${req.body.name}%'))`)
        .orWhere(`LOWER(unaccent(last_name)) like LOWER(unaccent('%${req.body.last_name}%'))`)
        .getMany();
    
        return  res.status(200).json(patient)
     
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getPatientByCiUpdate = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    let patient = await patientRepository
        .createQueryBuilder("patient")
        .where("patient.ci_rif = :look_ci_rif", { look_ci_rif: req.body.look_ci_rif })
        .andWhere("patient.ci_rif != :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(patient){
        return  res.status(200).json(patient)
      }
      else{
        return res.status(404).json({msg: "Paciente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}


export  { createPatient, 
          updatePatient,
          deletePatient, 
          getPatientByCi,
          getPatientByNames, 
          getPatientByBirthday,
          getPatientByCiUpdate,
        
        };