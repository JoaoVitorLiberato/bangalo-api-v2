import { container } from "tsyringe";

import { ComplementRepository } from "../../../Infrastructure/Repositories/Complement.infrastructure.repositories";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ComplementUseCase, IComplementRepository } from "../../../Application/Usecases/ComplementUseCase.application.usecases";
import { ComplementService } from "../../../Application/Services/ComplementService.application.service";

container.register<IComplementRepository>(
  "IComplementRepository",
  {
    useClass: ComplementRepository
  }
);

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<ComplementUseCase>(ComplementUseCase);
container.registerSingleton<ComplementRepository>(ComplementRepository);
container.registerSingleton<ComplementService>(ComplementService);