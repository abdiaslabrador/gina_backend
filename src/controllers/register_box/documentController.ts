import { Product } from "../../entities/Product";
import { Document } from "../../entities/Document";
import { Document_det } from "../../entities/Document_det";
import { Document_payment } from "../../entities/Document_payment";
import { PaymentType } from "../../entities/PaymentType";

import { Bill } from "../../entities/Bill";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";


const getBillByDate = async (req: Request, res: Response, next:NextFunction) => {

    try {
        const bills = await AppDataSource
        .createQueryBuilder(Bill, "bill")
        .withDeleted()
        .innerJoinAndSelect("bill.docu", "document")
        .innerJoinAndSelect("document.client", "client")
        .innerJoinAndSelect("document.docu_dets", "docu_dets")
        .innerJoinAndSelect("docu_dets.product", "product")
        .innerJoinAndSelect("document.docu_payments", "docu_payments")
        .innerJoinAndSelect("docu_payments.payment", "payment")
        .innerJoinAndSelect("payment.currency", "currency")
        .where(`DATE_TRUNC('day', document.document_date) >= '${req.body.date_since}'`)
        .andWhere(`DATE_TRUNC('day', document.document_date) <= '${req.body.date_until}'`)
        .getMany();

        return  res.status(200).json(bills)
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }

const getBillById = async (req: Request, res: Response, next:NextFunction) => {

    try {
        const bill = await AppDataSource
        .createQueryBuilder(Bill, "bill")
        .withDeleted()
        .innerJoinAndSelect("bill.docu", "document")
        .innerJoinAndSelect("document.client", "client")
        .innerJoinAndSelect("document.docu_dets", "docu_dets")
        .innerJoinAndSelect("docu_dets.product", "product")
        .innerJoinAndSelect("document.docu_payments", "docu_payments")
        .innerJoinAndSelect("docu_payments.payment", "payment")
        .innerJoinAndSelect("payment.currency", "currency")
        .where("bill.id = :id", {id: req.body.id})
        .getOne();
        
        if(bill)
          return  res.status(200).json(bill)
        else
          return  res.status(404).json({msg: "Factura no encontrada"})

    } catch (error) {
      console.log(error)
      return next(error)
    }
  }

const createBill = async (req: Request, res: Response, next:NextFunction) => {

    try {
        await AppDataSource.transaction(async (transactionalEntityManager) => {
            const docRepository = await transactionalEntityManager.getRepository(Document);
            const doc_detRepository = await transactionalEntityManager.getRepository(Document_det);
            const doc_paymentRepository = await transactionalEntityManager.getRepository(Document_payment);
            const billRepository = await transactionalEntityManager.getRepository(Bill);
            const productRepository = await transactionalEntityManager.getRepository(Product);

            //se guarda el documento
            const docu = new Document;
            docu.document_date = new Date();
            docu.client = req.body.client;
            docu.currency_day_value = req.body.currency_day_value;
            docu.subtotal = req.body.subtotal;
            docu.discount = req.body.discount;
            docu.total = req.body.total;
            docu.total_payed = req.body.total_payed;
            docu.change = req.body.change;            
            await docRepository.save(docu);

            /*restando a los productos en el inventario
             la cantidad que se está sacando, 
             PREVIO A ESTO SE HACE EL CHECKING SI HAY CANTIDADES SUFICIENTES DISPONIBLES
             */
            let det_ids = [];
            for (const  {id} of req.body.docu_dets) {
              det_ids.push(id);
            }
           let products = await productRepository.createQueryBuilder("product")
            .where("product.id in (:...ids)", {ids: det_ids})
            .andWhere("product.enable_cant = true")
            .getMany();
            
            for (let i = 0; i < products.length; i++) {
              for (let j = 0; j < req.body.docu_dets.length; j++) {
                  if(products[i].id == req.body.docu_dets[j].id){
                      products[i].cant = products[i].cant - req.body.docu_dets[j].cant;
                  }
              }
            }
            await productRepository.save(products);

            //se guardan los articulos de documento
            const docu_det_list :  Document_det[] = [];
            req.body.docu_dets.forEach((docu_det : any)  => {
                const new_docu_det = new Document_det();
                
                new_docu_det.cant= docu_det.cant;
                new_docu_det.price_sold= docu_det.price;
                new_docu_det.price_ref= docu_det.price_ref;
                new_docu_det.subtotal= docu_det.subtotal;
                new_docu_det.docu= {id : docu.id} as Document;
                new_docu_det.product= {id : docu_det.id} as Product;
                docu_det_list.push(new_docu_det);
            });
            await doc_detRepository.save(docu_det_list);

            // se guardan los pagos del documento            
            const docu_payment_list :  Document_payment[] = [];
            req.body.docu_payments.forEach((docu_payment : any)  => {
                const new_docu_payment = new Document_payment();
                
                new_docu_payment.payment_date= docu_payment.payment_date;
                new_docu_payment.amount= docu_payment.amount;
                new_docu_payment.currency_day_value= docu_payment.currency_day_value;
                new_docu_payment.currency_amount= docu_payment.currency_amount;
                new_docu_payment.detail= docu_payment.detail;
                new_docu_payment.docu= {id : docu.id} as Document;
                new_docu_payment.payment= {id : docu_payment.paymentType_id} as PaymentType;
                docu_payment_list.push(new_docu_payment);
            });
            await doc_paymentRepository.save(docu_payment_list);

            // se guarda la factura
            const bill = new Bill();
            bill.docu = {id : docu.id} as Document;
            await  billRepository.save(bill);    
        })
       
        return  res.status(200).json({msg: "creado exitosamente"})
          
    } catch (error) {
      console.log(error)
      return next(error)
    }
    
}

const cancelBill = async (req: Request, res: Response, next:NextFunction) => {

  try {
    await AppDataSource.transaction(async (transactionalEntityManager) => {
      const documentRepository = await transactionalEntityManager.getRepository(Document);
      const docu = await documentRepository
      .createQueryBuilder("document")
      .innerJoin("document.docu_bill", "docu_bill")
      .where("docu_bill.id = :id", {id: req.body.id})
      .getOne();

      if(docu){
        docu.canceled = true;
        documentRepository.save(docu);
        return  res.status(200).json({msg: "Factura actualizado"})
      }
      else
        return  res.status(404).json({msg: "Factura no encontrada"})
    })
      
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

export  {
            createBill, getBillById, getBillByDate,
            cancelBill
        };