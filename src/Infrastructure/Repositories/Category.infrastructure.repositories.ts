import { Category } from "../../Domain/Entities/Cotegory.domain.entities";
import { ICategoryRepository } from "../../Domain/Usecases/CategoryUseCase.domain.usecases";
import { CategoryModel } from "../Database/Models/Category.infrastructure.database.models";

export class CategoryRepository implements ICategoryRepository {
  async create (category: Category): Promise<Category | string> {
    return new Promise((resolve, reject) => {
      CategoryModel.create({ ...category })
        .then((responseModel) => resolve(responseModel as unknown as Category))
        .catch((error) => {
          console.error("[ERROR CategoryRepository]", error);
          reject("error-create-category-model");
        });
    })
  }

  async views (): Promise<Category[]|string> {
    return new Promise((resolve) => {
      CategoryModel.findAll()
        .then((responseModel) => resolve(responseModel as unknown as Category[]))
        .catch((error) => {
          console.error("[ERROR CategoryRepository]", error);
          resolve("error-view-category-model");
        });
    })
  }

  async viewById (id: string): Promise<Category|string> {
    return new Promise((resolve) => {
      CategoryModel.findByPk(id)
        .then((responseModel) => resolve(responseModel as unknown as Category))
        .catch((error) => {
          console.error("[ERROR CategoryRepository]", error);
          resolve("error-view-category-model");
        });
    })
  }

  async update (id: string, data: Category): Promise<Category|string> {
    return new Promise((resolve) => {
      CategoryModel.update(data, { where: { id } })
        .then((responseModel) => resolve(responseModel as unknown as Category))
        .catch((error) => {
          console.error("[ERROR CategoryRepository]", error);
          resolve("error-update-category-model");
        });
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve) => {
      CategoryModel.destroy({ where: { id } })
        .then(() => resolve("Categoria deletada com sucesso."))
        .catch((error) => {
          console.error("[ERROR CategoryRepository]", error);
          resolve("error-delete-category-model");
        });
    })
  }
}