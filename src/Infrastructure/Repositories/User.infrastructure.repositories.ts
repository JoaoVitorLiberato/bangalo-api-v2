import { User } from "../../Domain/Entities/User.domain.entities";
import { UserModel } from "../Database/Models/User.infrastructure.database.models";
import { IUserRepository } from "../../Domain/Usecases/UserUseCase.domain.usecases.user";

export class UserRepository implements IUserRepository {
  async save (user: User): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.create({ ...user })
        .then((responseModel) => resolve(responseModel as unknown as User))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
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
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve("error-find-users-model")
        })
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
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve("error-find-user-by-id-model")
        })
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
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve("error-find-user-by-id-model")
        })
    })
  }

  async update (id: string, user:User): Promise<string> {
    return new Promise((resolve) => {
      UserModel.update({
        email: user.email,
        details: {
          name: user.details.name,
          age: user.details.age,
          phone: user.details.phone,
          thumbnail: {
            location: user.details.thumbnail?.location || "",
            url_image: user.details.thumbnail?.url || ""
          }
        }
      }, { where: { id } })
        .then(() => resolve("Usuário atualizado com sucesso."))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve(`error-update-user-models`)
        })
    })
  }

  async updatePassword (id: string, data: { password: string, newPassword: string }): Promise<string> {
    return new Promise((resolve) => {
      UserModel.update({ password: String(data.newPassword) }, { where: { id } })
        .then(() => resolve("Senha atualizada com sucesso."))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve(`error-update-password-user-models`)  
        })
    })
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve) => {
      UserModel.destroy({ where: { id } })
        .then(() => resolve("Usuário deletado com sucesso."))
        .catch((error) => {
          console.error("[ERROR UserRepository]", error)
          resolve(`error-delete-user-models`)
        })
    })
  }
}