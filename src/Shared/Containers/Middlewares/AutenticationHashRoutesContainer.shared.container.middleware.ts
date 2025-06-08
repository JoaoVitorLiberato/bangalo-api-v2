import { container } from "tsyringe"
import { UserService } from "../../../Application/Services/UserService.application.service"
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters"
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories"

container.registerSingleton<UserRepository>(UserRepository)
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter)
container.registerSingleton<UserService>(UserService)