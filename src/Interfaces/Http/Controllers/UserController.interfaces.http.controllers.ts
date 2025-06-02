import { container } from "tsyringe";
import { Context } from "elysia";

import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories";
import { IUserRepository } from "../../../Domain/Usecases/UserUseCase.domain.usecases.user";
import { User } from "../../../Domain/Entities/User.domain.entities";
import { UserUseCase } from "../../../Domain/Usecases/UserUseCase.domain.usecases.user";
import { UserService } from "../../../Application/Services/UserService.application.service";

container.register<IUserRepository>(
  "IUserRepository",
  { useClass: UserRepository }
)

container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<UserUseCase>(UserUseCase);
container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);

export class UserController {
  private _userService = container.resolve(UserService)

  async createUser ({ body, set }: Context) {
    try {
      const DTO = body as User
      const PAYLOAD = new User(
        DTO.email,
        DTO.password,
        DTO.details,
      )

      const responseService = await this._userService.create(PAYLOAD)

      if (/^(error-create-user)$/i.test(String(responseService.codigo))) {
        set.status = 400
        return responseService
      }

      return responseService
    } catch (error) {
      set.status = 500
      console.error("ERROR - OrderController", error)
      return "Erro Server"
    }
  }
}