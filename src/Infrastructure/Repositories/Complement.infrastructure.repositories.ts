import { Complement } from "../../Domain/Entities/Complement.domain.entities";
import { IComplementRepository } from "../../Domain/Usecases/ComplementUseCase.domain.usecases";
import { ComplementModel } from "../Database/Models/Complement.infrastructure.database.models";

export class ComplementRepository implements IComplementRepository {
  async create (complemnt: Complement): Promise<Complement | string> {
    return new Promise((resolve, reject) => {
      ComplementModel.create({ ...complemnt })
        .then((responseModel) => resolve(responseModel as unknown as Complement))
        .catch((error) => {
          console.error("[ERROR ComplementRepository]", error);
          reject("error-create-complement-model");
        });
    })
  }

  async views (): Promise<Complement[]|string> {
    return new Promise((resolve) => {
      ComplementModel.findAll()
        .then((responseModel) => resolve(responseModel as unknown as Complement[]))
        .catch((error) => {
          console.error("[ERROR ComplementRepository]", error);
          resolve("error-view-complement-model");
        });
    })
  }

  async viewById (id: string): Promise<Complement|string> {
    return new Promise((resolve) => {
      ComplementModel.findByPk(id)
        .then((responseModel) => resolve(responseModel as unknown as Complement))
        .catch((error) => {
          console.error("[ERROR ComplementRepository]", error);
          resolve("error-view-complement-model");
        });
    })
  }

  async update (id: string, data: Complement): Promise<Complement|string> {
    return new Promise((resolve) => {
      ComplementModel.update(data, { where: { id } })
        .then((responseModel) => resolve(responseModel as unknown as Complement))
        .catch((error) => {
          console.error("[ERROR ComplementRepository]", error);
          resolve("error-update-complement-model");
        });
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve) => {
      ComplementModel.destroy({ where: { id } })
        .then(() => resolve("Complemento deletado com sucesso."))
        .catch((error) => {
          console.error("[ERROR ComplementRepository]", error);
          resolve("error-delete-complement-model");
        });
    })
  }
}