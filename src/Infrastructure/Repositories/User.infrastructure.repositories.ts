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
        limit: 50,
        raw: true,
        attributes: {
          exclude: ["password"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User[]))
        .catch(() => resolve("error-find-users-model"))
    })
  }

  async user (id: string): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.findByPk(id, {
        raw: true,
        attributes: {
          exclude: ["password", "id"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch(() => resolve("error-find-user-by-id-model"))
    })
  }

  async cache (id: string): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.findByPk(id, {
        raw: true,
        attributes: {
          exclude: ["id"]
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch(() => resolve("error-find-user-by-id-model"))
    })
  }

  async update (id: string, user:User): Promise<string> {
    return new Promise((resolve) => {
      UserModel.update({ ...user }, { where: { id } })
        .then(() => resolve("Usuário atualizado com sucesso."))
        .catch((error) => {
          console.log("[ERROR UserRepository]", error)
          resolve(`error-update-user-models`)
        })
    })
  }
}