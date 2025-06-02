import { injectable } from "tsyringe";

import { User } from "../../Domain/Entities/User.domain.entities";
import { UserModel } from "../Database/Models/User.infrastructure.database.models";
import { IUserRepository } from "../../Domain/Usecases/UserUseCase.domain.usecases.user";

export class UserRepository implements IUserRepository {
  async save (user: User): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.create({ ...user })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch((error) => {
          console.log("[ERROR UserRepository]", error)
          resolve(`error-create-user-models`)
        })
    })
  }

  async users (): Promise<User[]|string> {
    return new Promise((resolve) => {
      UserModel.findAll({
        limit: 20,
        attributes: {
          exclude: ["password"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User[]))
        .catch(() => resolve("error-find-users-models"))
    })
  }

  async user (id: string): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.findByPk(id, {
        attributes: {
          exclude: ["password", "id"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch(() => resolve("error-find-users-models"))
    })
  }
}