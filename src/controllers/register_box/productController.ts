import { Product } from "../../entities/Product";
import { Currency } from "../../entities/Currency";
import { alphabet_code } from "../../helpers/codeGenerator";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { getDataSource, AppDataSource } from "../../data-source";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const productRepository = AppDataSource.getRepository(Product);

    const product = new Product();
    product.code = alphabet_code(5).toLocaleLowerCase();
    product.description = req.body.description
    product.cant = req.body.cant
    product.price = req.body.price
    product.price_ref = req.body.price_ref
    product.admit_update_currency = req.body.admit_update_currency
    product.enable_cant = req.body.enable_cant

    await productRepository.save(product);

    return res.status(200).json({ msg: "Producto creado exitosamente" })

  } catch (error) {
    console.log(error)
    return next(error)
  }

}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
      .createQueryBuilder("product")
      .softDelete()
      .where("product.id = :id", { id: req.body.id })
      .andWhere("deleteAt is null")
      .execute();

    if (product.affected > 0) {
      return res.status(200).json({ msg: "Producto eliminado" })
    }
    else {
      return res.status(404).json({ msg: "Producto no encontrado" })
    }
  } catch (error) {
    console.log(error)
    return next(error)
  }

}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product = await productRepository
      .createQueryBuilder("product")
      .where("product.id = :id", { id: req.body.id })
      .getOne();

    if (product) {

      product.description = req.body.description
      product.cant = req.body.cant
      product.price = req.body.price
      product.price_ref = req.body.price_ref
      product.admit_update_currency = req.body.admit_update_currency
      product.enable_cant = req.body.enable_cant

      await productRepository.save(product);

      return res.status(200).json({ msg: "Producto actualizado" })
    }
    else {
      return res.status(404).json({ msg: "Producto no se encuentra" })
    }
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const searchBy = async (req: Request, res: Response, next: NextFunction) => {
  //CREATE EXTENSION IF NOT EXISTS "unaccent";
  try {
    const productRepository = AppDataSource.getRepository(Product);
    let product: Product[] = [];
    if (req.body.selectOption == "lessThan") {
      product = await productRepository
        .createQueryBuilder("product")
        .where("product.cant <= :cant", { cant: req.body.selectValue })
        .andWhere("product.cant >= 0")
        .orderBy("product.description")
        .getMany();
    } else if (req.body.selectOption == "description") {
      product = await productRepository
        .createQueryBuilder("product")
        .where(`LOWER(unaccent(description)) like LOWER(unaccent('%${req.body.selectValue}%'))`)
        .orderBy("product.description")
        .getMany();
    } else if (req.body.selectOption == "code") {
      product = await productRepository
        .createQueryBuilder("product")
        .where("LOWER(product.code) = LOWER(:code)", { code: req.body.selectValue })
        .orderBy("product.description")
        .getMany();
    } else if (req.body.selectOption == "all") {
      product = await productRepository
        .createQueryBuilder("product")
        .orderBy("product.description")
        .getMany();
    }

    for (let i = 0; i < product.length; i++) {
      product[i].price = Number(product[i].price);
      product[i].price_ref = Number(product[i].price_ref);
    }

    return res.status(200).json(product)
  } catch (error) {
    console.log(error)
    return next(error)
  }

}

const updateProductPrices = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const currencyRepository = AppDataSource.getRepository(Currency);
    let currency = await currencyRepository
      .createQueryBuilder("currency")
      .where("LOWER(currency.name) LIKE '%dolar%'")
      .getOne();

    if (currency) {
      await AppDataSource.transaction(async (transactionalEntityManager) => {
        const productRepository = await transactionalEntityManager.getRepository(Product);
        await productRepository
          .createQueryBuilder()
          .update()
          .set({
            price: () => `price_ref * ${currency.today_currency}`,
          })
          .where("admit_update_currency = true")
          .execute()
      })

    }
    else {
      return res.status(404).json({ msg: "Divisa no encontrada" })
    }
    return res.status(200).json({ msg: "Precio de productos actualizado" })

  } catch (error) {
    console.log(error)
    return next(error)
  }
}

const checkCant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let ids = [];
    for (const { id } of req.body.productListRegisterBox) {
      ids.push(id);
    }
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository
      .createQueryBuilder("product")
      .where("product.id in (:...ids)", { ids: ids })
      .andWhere("product.enable_cant = true")
      .getMany();

    let productBadList = [];
    req.body.productListRegisterBox.forEach(productRegisterBox => {
      const product = products.find(product => product.id == productRegisterBox.id && product.cant < productRegisterBox.cant)
      if (product) {
        productBadList.push({
          id: product.id,
          description: product.description,
          cant: product.cant,
        })
      }
    })
    if (productBadList.length == 0) {
      return res.status(200).json({ msg: "Cantidates suficiente para cada producto a llevar" })
    } else {
      return res.status(400).json({ code: "PRODUCT_BADCANT", productBadList: productBadList })
    }

  } catch (error) {
    console.log(error)
    return next(error)
  }
}

export {
  createProduct, deleteProduct, updateProduct,
  searchBy, updateProductPrices, checkCant
};