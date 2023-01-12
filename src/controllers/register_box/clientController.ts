import { Client } from "../../entities/Client";
import { alphabet_code } from "../../helpers/codeGenerator";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";

const createClient = async (req: Request, res: Response, next:NextFunction) => {

    try {
      const clientRepository = AppDataSource.getRepository(Client);
      let client = await clientRepository
          .createQueryBuilder("client")
          .where("client.ci_rif = :ci_rif", { ci_rif: req.body.ci_rif })
          .getOne();

     

      if(!client){
        client = new Client();
        client.name=req.body.name
        client.last_name=req.body.last_name
        client.ci_rif=req.body.ci_rif
        client.phone_number=req.body.phone_number
        client.direction=req.body.direction

        await clientRepository.save(client);

        return  res.status(200).json({msg: "Cliente creado exitosamente"})
      }
      else{
            return res.status(400).json({msg: "Cliente ya existe"})
      }
          
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
}

const deleteClient = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const clientRepository = AppDataSource.getRepository(Client);
    let client = await clientRepository
        .createQueryBuilder("client")
        .where("client.id = :id", { id: req.body.id })
        .getOne();
    
      if(client){

        client.ci_rif=  alphabet_code(4) + client.ci_rif
        client.deleteAt=  new Date()
        await clientRepository.save(client);

        return  res.status(200).json({msg: "Cliente eliminado"})
      }
      else{
            return res.status(404).json({msg: "Cliente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const updateClient = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const clientRepository = AppDataSource.getRepository(Client);
    let client = await clientRepository
        .createQueryBuilder("client")
        .where("client.id = :id", { id: req.body.id })
        // .where("client.ci_rif = :ci_rif", { ci_rif: req.body.id })
        .getOne();
    
      if(client){

        client.name=req.body.name
        client.last_name=req.body.last_name
        client.ci_rif=req.body.ci_rif
        client.phone_number=req.body.phone_number
        client.direction=req.body.direction
        

        await clientRepository.save(client);

        return  res.status(200).json({msg: "Cliente actualizado"})
      }
      else{
            return res.status(404).json({msg: "Cliente no se encuentra"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const getClientByCi = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const clientRepository = AppDataSource.getRepository(Client);
    let client = await clientRepository
        .createQueryBuilder("client")
        .select([
          "client.id",
          "client.name",
          "client.last_name",
          "client.ci_rif",
          "client.phone_number",
          "client.direction",
          "client.createdAt",
          "client.updateAt",
        ])
        .where("client.ci_rif = :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(client){
        return  res.status(200).json(client)
      }
      else{
        return res.status(404).json({msg: "Cliente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}


const getClientByCiUpdate = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const clientRepository = AppDataSource.getRepository(Client);
    let client = await clientRepository
        .createQueryBuilder("client")
        .select([
          "client.id",
          "client.name",
          "client.last_name",
          "client.ci_rif",
          "client.phone_number",
          "client.direction",
          "client.createdAt",
          "client.updateAt",
        ])
        .where("client.ci_rif = :look_ci_rif", { look_ci_rif: req.body.look_ci_rif })
        .andWhere("client.ci_rif != :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(client){
        return  res.status(200).json(client)
      }
      else{
        return res.status(404).json({msg: "Cliente no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}


export  {
          createClient, deleteClient, updateClient, 
          getClientByCi, getClientByCiUpdate
        //  allEmployee,  
        };