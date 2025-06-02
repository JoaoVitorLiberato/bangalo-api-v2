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
      await this.user.execute(user)
      return await this.notify.send({
        mensagem: "Usuário criado com sucesso."
      })
    } catch (error) {
      console.error("[ERROR OrderService]", error)
      return this.notify.send({
        codigo: "error-create-user",
        mensagem: "Houve um erro ao criar um usuário."
      })
    }
  }
}