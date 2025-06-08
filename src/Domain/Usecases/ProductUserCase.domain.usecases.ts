import { inject, injectable } from "tsyringe";
import { ProductFactory } from "../Factory/ProductFactory.domain.factory";
import { Product } from "../Entities/Product.domain.entities";

export interface IProductRepository {
  save(product: Product): Promise<string>;
  // findById(id: string): Promise<Product>;
  // findAll(): Promise<Product[]>;
  // update(id: string, product: Product): Promise<Product>;
  // delete(id: string): Promise<void>;
}

@injectable()
export class ProductUserCase {
  constructor (
    @inject("IProductRepository") private repository: IProductRepository
  ) {}

  async save (product: Product): Promise<string> {
    const dto = ProductFactory.save({
      tumbnail: {
        url: product.tumbnail.url,
        location: "products",
        upload: product.tumbnail.upload,
      },
      category_id: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      differences: product.differences,
      note_client: product.note_client,
    });

    return await this.repository.save(dto);
  }
}