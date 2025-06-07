import { container } from "tsyringe";
import { AutenticationService } from "../../../Application/Services/AutenticationService.application.service";
import { IAutenticationRepository, AutenticationUserCase } from "../../../Domain/Usecases/AutenticationUseCase.domain.usecases";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { AutenticationRepository } from "../../../Infrastructure/Repositories/Autentication.infrastructure.repositories";

container.register<IAutenticationRepository>(
  "IAutenticationRepository",
  { useClass: AutenticationRepository }
);

container.registerSingleton<AutenticationUserCase>(AutenticationUserCase);
container.registerSingleton<AutenticationRepository>(AutenticationRepository);
container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<AutenticationService>(AutenticationService);