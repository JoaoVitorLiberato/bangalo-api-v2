import { injectable } from "tsyringe";

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

      if (/^(error-find-users-models)$/i.test(String(responseRepository))) throw Error("Erro ao procurar usuários")

      return responseRepository as User[]
    } catch (error) {
      console.error("[ERROR OrderService - findall]", error)
      return this.notify.send({
        codigo: "error-find-all-users",
        mensagem: "Houve ao buscar os usuários."
      })
    }
  }
}