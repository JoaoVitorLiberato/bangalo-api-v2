import { container } from "tsyringe";
import { UserService } from "../../../Application/Services/UserService.application.service";
import { IUserRepository, UserUseCase } from "../../../Domain/Usecases/UserUseCase.domain.usecases.user";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { UserRepository } from "../../../Infrastructure/Repositories/User.infrastructure.repositories";

container.register<IUserRepository>(
  "IUserRepository",
  { useClass: UserRepository }
)

container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<UserUseCase>(UserUseCase);
container.registerSingleton<UserRepository>(UserRepository);
container.registerSingleton<UserService>(UserService);
