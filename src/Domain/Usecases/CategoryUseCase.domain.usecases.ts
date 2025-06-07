import { injectable, inject } from "tsyringe";
import { Category } from "../Entities/Cotegory.domain.entities";
import { CategoryFactory } from "../Factory/CategoryFactory.domain.factory";

export interface ICategoryRepository {
  create: (complement: Category) => Promise<Category|string>;
  views: () => Promise<Category[]|string>;
  viewById: (id: string) => Promise<Category|string>;
  update: (id: string, data: Category) => Promise<Category|string>;
  delete: (id: string) => Promise<string>;
}

@injectable()
export class CategoryUseCase {
  constructor(
    @inject("ICategoryRepository") private repository: ICategoryRepository
  ) {}

  async create (data:Category) {
    const dto = CategoryFactory.save({
      name: data.name
    });

    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async update (id: string, data: Category) {
    const dto = CategoryFactory.save({
      name: data.name
    });

    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}
