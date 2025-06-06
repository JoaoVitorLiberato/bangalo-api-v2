import { container } from "tsyringe"
import { UserService } from "../../../Application/Services/UserService.application.service"
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters"
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories"

container.registerSingleton<UserRepository>(UserRepository)
container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter)
container.registerSingleton<UserService>(UserService)