import { injectable } from "tsyringe";
import { ProductUserCase } from "../../Domain/Usecases/ProductUserCase.domain.usecases";
import { Product } from "../../Domain/Entities/Product.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters";

@injectable()
export class ProductService {
  constructor (
    private readonly product: ProductUserCase,
    private readonly notification: InternalNotificationServiceAdapter
  ) {}

  async save (product: Product): Promise<any> {
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
}