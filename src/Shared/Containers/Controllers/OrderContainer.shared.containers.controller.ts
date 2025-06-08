import { container } from "tsyringe";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { IOrderRepository, OrderUseCase } from "../../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters";
import { OrderRepository } from "../../../Infrastructure/Repositories/Order.infrastructure.repositories";
import { RedisPublish } from "../../../Infrastructure/Redis/RedisPublish.infrastructure.redis";

container.register<IOrderRepository>(
  "IOrderRepository",
  { useClass: OrderRepository }
);

container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<OrderUseCase>(OrderUseCase);
container.registerSingleton<RedisPublish>(RedisPublish);
container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<OrderService>(OrderService);