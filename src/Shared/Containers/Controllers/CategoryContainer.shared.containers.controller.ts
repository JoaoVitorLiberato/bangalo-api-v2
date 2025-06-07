import { container } from "tsyringe";

import { CategoryRepository } from "../../../Infrastructure/Repositories/Category.infrastructure.repositories";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { CategoryUseCase, ICategoryRepository } from "../../../Domain/Usecases/CategoryUseCase.domain.usecases";
import { CategoryService } from "../../../Application/Services/CategoryService.application.service";

container.register<ICategoryRepository>(
  "ICategoryRepository",
  {
    useClass: CategoryRepository
  }
);

container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<CategoryUseCase>(CategoryUseCase);
container.registerSingleton<CategoryRepository>(CategoryRepository);
container.registerSingleton<CategoryService>(CategoryService);