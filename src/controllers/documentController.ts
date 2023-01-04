import { Product } from "../entities/Product";
// import { Currency } from "../entities/Currency";
import { alphabet_code } from "../helpers/codeGenerator";
import { Document } from "../entities/Document";
import { Document_det } from "../entities/Document_det";
import { Document_payment } from "../entities/Document_payment";
import { PaymentType } from "../entities/PaymentType";

import { Bill } from "../entities/Bill";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../data-source";

const createBill = async (req: Request, res: Response, next:NextFunction) => {

    try {
        await AppDataSource.transaction(async (transactionalEntityManager) => {
            const docRepository = await transactionalEntityManager.getRepository(Document);
            const doc_detRepository = await transactionalEntityManager.getRepository(Document_det);
            const doc_paymentRepository = await transactionalEntityManager.getRepository(Document_payment);
            const billRepository = await transactionalEntityManager.getRepository(Bill);

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

            const docu_det_list :  Document_det[] = [];
            req.body.productList.forEach((product : any)  => {
                const docu_det = new Document_det();
                
                docu_det.cant= product.cant;
                docu_det.price_sold= product.price;
                docu_det.price_ref= product.price_ref;
                docu_det.subtotal= product.subtotal;
                docu_det.docu= {id : docu.id} as Document;
                docu_det.product= {id : product.id} as Product;
                docu_det_list.push(docu_det);
            });
            await doc_detRepository.save(docu_det_list);

            const docu_payment_list :  Document_payment[] = [];
            req.body.paymentMadeList.forEach((payment : any)  => {
                const docu_payment = new Document_payment();
                
                docu_payment.payment_date= payment.payment_date;
                docu_payment.amount= payment.amount;
                docu_payment.currency_day_value= payment.currency_day_value;
                docu_payment.currency_amount= payment.currency_amount;
                docu_payment.detail= payment.detail;
                docu_payment.docu= {id : docu.id} as Document;
                docu_payment.payment= {id : payment.paymentType_id} as PaymentType;
                docu_payment_list.push(docu_payment);
            });
            await doc_paymentRepository.save(docu_payment_list);

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

// const deleteProduct = async (req: Request, res: Response, next:NextFunction) => {

//   try {
//     const productRepository = AppDataSource.getRepository(Product);
//     let product = await productRepository
//         .createQueryBuilder("product")
//         .softDelete()
//         .where("product.id = :id", { id: req.body.id })
//         .andWhere("deleteAt is null")
//         .execute();

//       if(product.affected > 0){
//         return  res.status(200).json({msg: "Producto eliminado"})
//       }
//       else{
//         return res.status(404).json({msg: "Producto no encontrado"})
//       }
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
  
// }

// const updateProduct = async (req: Request, res: Response, next:NextFunction) => {
//   try {
//     const productRepository = AppDataSource.getRepository(Product);
//     let product = await productRepository
//         .createQueryBuilder("product")
//         .where("product.id = :id", { id: req.body.id })
//         .getOne();
    
//       if(product){

//         product.description=req.body.description
//         product.cant=req.body.cant
//         product.price=req.body.price
//         product.price_ref=req.body.price_ref
//         product.admit_update_currency=req.body.admit_update_currency
//         product.enable_cant=req.body.enable_cant

//         await productRepository.save(product);

//         return  res.status(200).json({msg: "Producto actualizado"})
//       }
//       else{
//             return res.status(404).json({msg: "Producto no se encuentra"})
//       }
//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
// }

// const updateProductPrices = async (req: Request, res: Response, next:NextFunction) => {
//   try {
    
//     const currencyRepository = AppDataSource.getRepository(Currency);
//     let currency = await currencyRepository
//         .createQueryBuilder("currency")
//         .where("LOWER(currency.name) LIKE '%dolar%'")
//         .getOne();

//     if(currency){
//     const productRepository = AppDataSource.getRepository(Product);
//     await productRepository
//                   .createQueryBuilder()
//                   .update()
//                   .set({
                    
//                     price: () => `price_ref * ${currency.today_currency}`,
//                   })
//                   .where("admit_update_currency = true")
//                   .execute()
//     }
//     else{
//       return  res.status(404).json({msg: "Divisa no encontrada"})
//     }
//     return  res.status(200).json({msg: "Precio de productos actualizado"})

//   } catch (error) {
//     console.log(error)
//     return next(error)
//   }
// }

export  {
            createBill, 
            // deleteProduct, updateProduct, 
            // searchBy, updateProductPrices
        };