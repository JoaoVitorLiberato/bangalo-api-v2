import { injectable } from "tsyringe";
import { ProductUserCase } from "../Usecases/ProductUserCase.application.usecases";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

@injectable()
export class ProductService {
  constructor (
    private readonly product: ProductUserCase,
    private readonly notification: InternalNotificationServiceAdapter
  ) {}

  async create (product: Product): Promise<any> {
    try {
      const responseRepository = await this.product.save(product);

      if (/^(error-save-product-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao salvar o produto");

      return await this.notification.send({
        mensagem: responseRepository
      });

    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-create-product",
        mensagem: "Houve um erro ao salvar o produto"
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this.product.views();

      if (/^(error-views-product-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao buscar os produtos");

      return responseRepository
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-views-product",
        mensagem: "Houve um erro ao buscar os produtos"
      });
    }
  }

  async viewById (id: string): Promise<any> {
    try {
      const responseRepository = await this.product.viewById(id);

      if (/^(error-view-by-id-product-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao buscar o produto");
      if (!responseRepository) {
        return await this.notification.send({
          codigo: "product-not-found",
          mensagem: "Nenhum produto encontrado"
        });
      }

      return responseRepository
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-view-by-id-product",
        mensagem: "Houve um erro ao buscar o produto"
      });
    }
  }

  async update (id: string, product: Product): Promise<any> {
    try {
      const responseService = await this.product.viewById(id);

      if (/^(error-view-by-id-product-model)$/i.test(String(responseService))) throw new Error("Houve um erro ao buscar o produto");
      if (!responseService) {
        return await this.notification.send({
          codigo: "product-not-found",
          mensagem: "Nenhum produto encontrado"
        });
      }
      const responseRepository = await this.product.update(id, product);

      if (/^(error-update-product-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao atualizar o produto");

      return await this.notification.send({
        mensagem: "Produto atualizado com sucesso"
      });
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-update-product",
        mensagem: "Houve um erro ao atualizar o produto"
      });
    }
  }

  async delete (id: string): Promise<any> {
    try {
      const responseService = await this.product.viewById(id);

      if (/^(error-view-by-id-product-model)$/i.test(String(responseService))) throw new Error("Houve um erro ao buscar o produto");
      if (!responseService) {
        return await this.notification.send({
          codigo: "product-not-found",
          mensagem: "Nenhum produto encontrado"
        });
      }

      const responseRepository = await this.product.delete(id);

      if (/^(error-delete-product-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao deletar o produto");

      return await this.notification.send({
        mensagem: responseRepository
      });
    } catch (error) {
      console.error("ERROR [ProductService]", error);
      return await this.notification.send({
        codigo: "error-delete-product",
        mensagem: "Houve um erro ao deletar o produto"
      });
    }
  }
}