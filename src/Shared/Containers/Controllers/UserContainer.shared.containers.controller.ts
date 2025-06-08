import { container } from "tsyringe";
import { UserService } from "../../../Application/Services/UserService.application.service";
import { IUserRepository, UserUseCase } from "../../../Domain/Usecases/UserUseCase.domain.usecases.user";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters";
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories";

// dependencia storage
import "../Adapters/StorageBangalo.shared.containers.adapters"

container.register<IUserRepository>(
  "IUserRepository",
  { useClass: UserRepository }
)

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<UserUseCase>(UserUseCase);
container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);
