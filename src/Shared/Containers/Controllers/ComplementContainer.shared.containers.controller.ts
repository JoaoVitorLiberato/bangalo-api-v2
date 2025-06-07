import { container } from "tsyringe";

import { ComplementRepository } from "../../../Infrastructure/Repositories/Complement.infrastructure.repositories";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { ComplementUseCase, IComplementRepository } from "../../../Domain/Usecases/ComplementUseCase.domain.usecases";
import { ComplementService } from "../../../Application/Services/ComplementService.application.service";

container.register<IComplementRepository>(
  "IComplementRepository",
  {
    useClass: ComplementRepository
  }
);

container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<ComplementUseCase>(ComplementUseCase);
container.registerSingleton<ComplementRepository>(ComplementRepository);
container.registerSingleton<ComplementService>(ComplementService);