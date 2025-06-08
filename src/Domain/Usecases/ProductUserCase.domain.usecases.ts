import { inject, injectable } from "tsyringe";
import { ProductFactory } from "../Factory/ProductFactory.domain.factory";
import { Product } from "../Entities/Product.domain.entities";

export interface IProductRepository {
  create (product: Product): Promise<string>;
  views(): Promise<Product[]|string>;
  viewById(id: string): Promise<Product|string>;
  update(id: string, product: Product): Promise<string>;
  delete(id: string): Promise<string>;
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

    return await this.repository.create(dto);
  }

  async views (): Promise<Product[]|string> {
    return await this.repository.views();
  }

  async viewById (id: string): Promise<Product|string> {
    return await this.repository.viewById(id);
  }

  async update (id: string, product: Product): Promise<string> {
    return await this.repository.update(id, product);
  }

  async delete (id: string): Promise<string> {
    return await this.repository.delete(id);
  }
}