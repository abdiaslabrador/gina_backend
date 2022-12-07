import { Product } from "../entities/Product";
import { alphabet_code } from "../helpers/codeGenerator";
import { PatientBackground } from "../entities/PatientBackground";
import bcrypt  from "bcrypt";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getDataSource, AppDataSource } from "../data-source";

const createProduct = async (req: Request, res: Response, next:NextFunction) => {

    try {
      const productRepository = AppDataSource.getRepository(Product);

        const product = new Product();
        product.code=alphabet_code(5).toLocaleLowerCase();
        product.description=req.body.description
        product.cant=req.body.cant
        product.price=req.body.price
        product.price_ref=req.body.price_ref
        product.admit_update_currency=req.body.admit_update_currency

        await productRepository.save(product);

        return  res.status(200).json({msg: "Producto creado exitosamente"})
          
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
}

const deleteProduct = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
        .createQueryBuilder("product")
        .softDelete()
        .where("product.id = :id", { id: req.body.id })
        .andWhere("deleteAt is null")
        .execute();

      if(product.affected > 0){
        return  res.status(200).json({msg: "Producto eliminado"})
      }
      else{
        return res.status(404).json({msg: "Producto no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const updateProduct = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
        .createQueryBuilder("product")
        .where("product.id = :id", { id: req.body.id })
        // .where("product.ci_rif = :ci_rif", { ci_rif: req.body.id })
        .getOne();
    
      if(product){

        product.description=req.body.description
        product.cant=req.body.cant
        product.price=req.body.price
        product.price_ref=req.body.price_ref
        product.admit_update_currency=req.body.admit_update_currency
        

        await productRepository.save(product);

        return  res.status(200).json({msg: "Producto actualizado"})
      }
      else{
            return res.status(404).json({msg: "Producto no se encuentra"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const searchByDescription = async (req: Request, res: Response, next:NextFunction) => {
  /*recodar instalar la extenesion en la base de datos*/
  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
        .createQueryBuilder("product")
        .where(`LOWER(unaccent(description)) like LOWER(unaccent('%${req.body.description}%'))`)
        .orderBy("product.description")
        .getMany();

        return  res.status(200).json(product)
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const searchByCode = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
        .createQueryBuilder("product")
        .where("product.code = :code", {code : req.body.code})
        .getOne();

        if(product){
          return  res.status(200).json(product)
        }
        else{
          return res.status(404).json({msg: "Producto no encontrado"})
        }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const searchByRange = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
        .createQueryBuilder("product")
        .where("product.cant <= :cant", {cant : req.body.cant})
        .orderBy("product.cant")
        .getMany();

        return  res.status(200).json(product) 
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

export  {
            createProduct, deleteProduct, updateProduct, 
            searchByDescription, searchByCode, searchByRange
        };