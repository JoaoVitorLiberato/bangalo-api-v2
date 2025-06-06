import { injectable } from "tsyringe";
import argon2 from "argon2"

import { User } from "../../Domain/Entities/User.domain.entities";
import { UserUseCase } from "../../Domain/Usecases/UserUseCase.domain.usecases.user";
import { NotificationServiceAdapter } from "../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";

@injectable()
export class UserService {
  constructor (
    private user: UserUseCase,
    private notify: NotificationServiceAdapter
  ) {}

  async create (user: User): Promise<any> {
    try {
      await this.user.save(user)
      return await this.notify.send({
        mensagem: "Usuário criado com sucesso."
      })
    } catch (error) {
      console.error("[ERROR OrderService - create]", error)
      return this.notify.send({
        codigo: "error-create-user",
        mensagem: "Houve um erro ao criar um usuário."
      })
    }
  }

  async findall (): Promise<User[]|any> {
    try {
      const responseRepository = await this.user.findAll()

      if (/^(error-find-users-model)$/i.test(String(responseRepository))) throw Error("Erro ao procurar usuários")

      return responseRepository as User[]
    } catch (error) {
      console.error("[ERROR OrderService - findall]", error)
      return this.notify.send({
        codigo: "error-find-all-users",
        mensagem: "Houve ao buscar os usuários."
      })
    }
  }

  async findById (id: string): Promise<User|any> {
    try {
      const responseRepository = await this.user.findById(id)
      if (/^(error-find-user-by-id-model)$/i.test(String(responseRepository))) throw Error("Erro ao procurar usuários")

      if (!responseRepository) {
        return this.notify.send({
          codigo: "user-not-found",
          mensagem: "Nenhum usuário encontrado."
        })
      }

      return responseRepository as User
    } catch (error) {
      console.error("[ERROR OrderService - findById]", error)
      return this.notify.send({
        codigo: "error-find-user-by-id",
        mensagem: "Houve ao buscar o usuário."
      })
    }
  }

  async update (id: string, user: User): Promise<any> {
    try {
      const { password } = await this.user.findCacheById(id) as User
      const VALIDATE_PASSWORD = await argon2.verify(password, user.password)

      if (!VALIDATE_PASSWORD) throw new Error("Password invalid!")

      const responseRepository = await this.user.update(id, user)
      if (/^(error-update-user-models)$/i.test(String(responseRepository))) throw new Error("Erro ao atualizar o usuário.")

      return await this.notify.send({
        mensagem: "Usuário atualizado com sucesso."
      })
    } catch (error) {
      console.error("[ERROR OrderService - update]", error)
      return this.notify.send({
        codigo: "error-update-user",
        mensagem: "Houve um erro ao atualizar um usuário."
      })
    }
  }

  async updatePassword (id: string, data: { password: string, newPassword: string }): Promise<any> {
    try {
      const responseCacheRepository = await this.user.findCacheById(id) as User
      const VALIDATE_PASSWORD = await argon2.verify(String(responseCacheRepository.password), String(data.password))

      if (!VALIDATE_PASSWORD) {
        console.log("password-invalid")
        return this.notify.send({
          codigo: "password-invalid",
          mensagem: "Senha inválida."
        })
      }

      const responseRepository = await this.user.updatePassword(id, data)
      if (/^(error-update-password-user-models)$/i.test(String(responseRepository))) throw new Error("Erro ao atualizar a senha.")

      return await this.notify.send({
        mensagem: "Senha atualizada com sucesso."
      })
    } catch (error) {
      console.error("[ERROR OrderService - updatePassword]", error)
      return this.notify.send({
        codigo: "error-update-password-user",
        mensagem: "Houve um erro ao atualizar a senha."
      })
    }
  }

  async delete (id: string): Promise<any> {
    try {
      const responseCacheRepository = await this.user.findCacheById(id)
      if (/^(error-find-user-by-id-model)$/i.test(String(responseCacheRepository))) throw new Error("Erro ao procurar usuários")

      if (!responseCacheRepository) {
        return this.notify.send({
          codigo: "user-not-found",
          mensagem: "Nenhum usuário encontrado."
        })
      }

      const responseRepository = await this.user.delete(id)
      if (/^(error-delete-user-models)$/i.test(String(responseRepository))) throw new Error("Erro ao deletar o usuário.")

      console.log("responseRepository", responseRepository)
      return await this.notify.send({
        mensagem: "Usuário deletado com sucesso."
      })
    } catch (error) {
      console.error("[ERROR OrderService - delete]", error)
      return this.notify.send({
        codigo: "error-delete-user",
        mensagem: "Houve um erro ao deletar um usuário."
      })
    }
  }
}
