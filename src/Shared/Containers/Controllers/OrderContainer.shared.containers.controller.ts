import { container } from "tsyringe";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { IOrderRepository, OrderUseCase } from "../../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { OrderRepository } from "../../../Infrastructure/Repositories/Order.infrastructure.repositories";

container.register<IOrderRepository>(
  "IOrderRepository",
  { useClass: OrderRepository }
);

container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<OrderUseCase>(OrderUseCase);
container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<OrderService>(OrderService);