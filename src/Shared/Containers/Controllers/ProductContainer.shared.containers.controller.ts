import { container } from "tsyringe";
import { ProductService } from "../../../Application/Services/ProductService.application.service";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { ProductUserCase, IProductRepository } from "../../../Application/Usecases/ProductUserCase.application.usecases";
import { ProductRepository } from "../../../Infrastructure/Repositories/Product.infrastructure.repositories";

// dependencia da storage
import "../Adapters/StorageBangalo.shared.containers.adapters"

container.register<IProductRepository>(
  "IProductRepository",
  {
    useClass: ProductRepository
  }
);

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<ProductUserCase>(ProductUserCase);
container.registerSingleton<ProductRepository>(ProductRepository);
container.registerSingleton<ProductService>(ProductService);
