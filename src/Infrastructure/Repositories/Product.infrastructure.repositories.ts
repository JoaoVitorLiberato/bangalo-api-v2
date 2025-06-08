import { IProductRepository } from "../../Domain/Usecases/ProductUserCase.domain.usecases";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { ProductModel } from "../Database/Models/Product.infrastructure.database.models";

export class ProductRepository implements IProductRepository {
  async save(product: Product): Promise<string> {
    return new Promise((resolve) => {
      ProductModel.create({ ...product })
      .then(() => resolve("Produto salvo com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository]", error);
        resolve("error-save-product-model")
      })
    })
  }
}