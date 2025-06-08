import { container } from "tsyringe"
import { UserService } from "../../../Application/Services/UserService.application.service"
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters"
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories"
import { IUserRepository, UserUseCase } from "../../../Domain/Usecases/UserUseCase.domain.usecases.user"

container.register<IUserRepository>(
  "IUserRepository",
  { useClass: UserRepository }
)

container.registerSingleton<UserRepository>(UserRepository)
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter)
container.registerSingleton<UserUseCase>(UserUseCase)
container.registerSingleton<UserService>(UserService)