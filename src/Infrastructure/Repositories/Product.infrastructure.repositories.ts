import { IProductRepository } from "../../Domain/Usecases/ProductUserCase.domain.usecases";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { ProductModel } from "../Database/Models/Product.infrastructure.database.models";

export class ProductRepository implements IProductRepository {
  async create (product: Product): Promise<string> {
    return new Promise((resolve) => {
      ProductModel.create({ ...product })
      .then(() => resolve("Produto salvo com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - create]", error);
        resolve("error-save-product-model")
      })
    })
  }

  async views (): Promise<Product[]|string> {
    return new Promise((resolve) => {
      ProductModel.findAll({
        raw: true,
      })
      .then((responseModel) => resolve(responseModel as unknown as Product[]))
      .catch((error) => {
        console.error("ERROR [ProductRepository - views]", error);
        resolve("error-views-product-model")
      })
    })
  }

  async viewById (id: string): Promise<Product|string> {
    return new Promise((resolve) => {
      ProductModel.findByPk(id, {
        raw: true,
      })
      .then((responseModel) => resolve(responseModel as unknown as Product))
      .catch((error) => {
        console.error("ERROR [ProductRepository - viewById]", error);
        resolve("error-view-by-id-product-model")
      })
    })
  }

  async update (id: string, product: Product): Promise<string> {
    return new Promise((resolve) => {
      ProductModel.update(product, { where: { id } })
      .then(() => resolve("Produto atualizado com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - update]", error);
        resolve("error-update-product-model")
      })
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve) => {
      ProductModel.destroy({ where: { id } })
      .then(() => resolve("Produto deletado com sucesso"))
      .catch((error) => {
        console.error("ERROR [ProductRepository - delete]", error);
        resolve("error-delete-product-model")
      })
    })
  }
}