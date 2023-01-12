import { Employee } from "../../entities/Employee";
import { alphabet_code } from "../../helpers/codeGenerator";
import bcrypt  from "bcrypt";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";

const createEmployee = async (req: Request, res: Response, next:NextFunction) => {

    try {
      const employeeRepository = AppDataSource.getRepository(Employee);
      let employee = await employeeRepository
          .createQueryBuilder("employee")
          .where("employee.ci_rif = :ci_rif", { ci_rif: req.body.ci_rif })
          .getOne();

      const saltRounds = 10;
      const passwordhashed = bcrypt.hashSync(req.body.password, saltRounds);

      if(!employee){
        employee = new Employee();
        employee.name=req.body.name
        employee.last_name=req.body.last_name
        employee.ci_rif=req.body.ci_rif
        employee.phone_number=req.body.phone_number
        employee.birthday=req.body.birthday
        employee.direction=req.body.direction
        employee.email = req.body.email;
        employee.password = passwordhashed;
        employee.active=req.body.active
        employee.secretary=req.body.secretary
        employee.superuser=req.body.superuser

        await employeeRepository.save(employee);

        return  res.status(200).json({msg: "Empleado creado exitosamente"})
      }
      else{
            return res.status(400).json({msg: "Empleado ya existe"})
      }
          
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
}

const deleteEmployee = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: req.body.id })
        .getOne();
    
      if(employee){

        employee.ci_rif=  alphabet_code(4) + employee.ci_rif
        employee.deleteAt=  new Date()
        employee.email = null;
        await employeeRepository.save(employee);

        let employees = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.id != :id", { id: req.user.id })
        .getMany();

        return  res.status(200).json(employees)
      }
      else{
            return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const updateEmployee = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: req.body.id })
        // .where("employee.ci_rif = :ci_rif", { ci_rif: req.body.id })
        .getOne();
    
      if(employee){

        employee.name=req.body.name
        employee.last_name=req.body.last_name
        employee.ci_rif=req.body.ci_rif
        employee.phone_number=req.body.phone_number
        employee.birthday=req.body.birthday
        employee.direction=req.body.direction
        employee.email = req.body.email;
        employee.active = req.body.active;
        employee.secretary = req.body.secretary;
        employee.superuser = req.body.superuser;
        

        await employeeRepository.save(employee);

        return  res.status(200).json({msg: "Empleado actualizado"})
      }
      else{
            return res.status(404).json({msg: "Empleado no se encuentra"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const updateEmployeePassword = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .where("employee.id = :id", { id: req.body.id })
        .getOne();
    
      if(employee){
        const saltRounds = 10;
        const passwordhashed = bcrypt.hashSync(req.body.password, saltRounds);
        employee.password = passwordhashed;
        

        await employeeRepository.save(employee);

        return  res.status(200).json({msg: "Empleado actualizado"})
      }
      else{
            return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const allEmployee = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employees = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.id != :id", { id: req.user.id })
        .getMany();
        
      return  res.status(200).json(employees)
  } catch (error) {
    console.log(error)
    return next(error)
  }
  
}

const getEmployeeByCi = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.ci_rif = :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(employee){
        return  res.status(200).json(employee)
      }
      else{
        return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getEmployeeByEmail = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.email = :email", { email: req.body.email })
        .getOne();
    
      if(employee){
        return  res.status(200).json(employee)
      }
      else{
        return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getEmployeeByCiUpdate = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.ci_rif = :look_ci_rif", { look_ci_rif: req.body.look_ci_rif })
        .andWhere("employee.ci_rif != :ci_rif", { ci_rif: req.body.ci_rif })
        .getOne();
    
      if(employee){
        return  res.status(200).json(employee)
      }
      else{
        return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const getEmployeeByEmailUpdate = async (req: Request, res: Response, next:NextFunction) => {

  try {
    const employeeRepository = AppDataSource.getRepository(Employee);
    let employee = await employeeRepository
        .createQueryBuilder("employee")
        .select([
          "employee.id",
          "employee.name",
          "employee.last_name",
          "employee.ci_rif",
          "employee.birthday",
          "employee.phone_number",
          "employee.direction",
          "employee.email",
          "employee.active",
          "employee.secretary",
          "employee.superuser",
          "employee.createdAt",
          "employee.updateAt",
        ])
        .where("employee.email = :look_email", { look_email: req.body.look_email })
        .andWhere("employee.email != :email", { email: req.body.email })
        .getOne();
    
      if(employee){
        return  res.status(200).json(employee)
      }
      else{
        return res.status(404).json({msg: "Empleado no encontrado"})
      }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}
export  {createEmployee, deleteEmployee, updateEmployee, updateEmployeePassword, 
         allEmployee, getEmployeeByCi, getEmployeeByEmail, getEmployeeByCiUpdate,
         getEmployeeByEmailUpdate
        };