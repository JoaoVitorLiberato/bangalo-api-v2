
import { container } from "tsyringe";
import { NotificationServiceAdapter } from "../../../Application/Adapters/NotificationAdapter.application.adapters";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { OrderUseCase } from "../../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { OrderRepository } from "../../../Infrastructure/Repositories/Order/Order.infrastructure.repositories.order";
import { Context } from "elysia";
import { Order } from "../../../Domain/Entities/Order.domain.entities";
import { Order_channel, RedisClient } from "../../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";
import { IOrderRepository } from "../../../Application/Ports/OrderRepository.application.ports";

container.register<IOrderRepository>(
  "IOrderRepository",
  { useClass: OrderRepository }
);

container.registerSingleton<OrderRepository>(OrderRepository);
container.registerSingleton<OrderUseCase>(OrderUseCase);
container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter);
container.registerSingleton<OrderService>(OrderService);

export class OrderController {
  private _orderService = container.resolve(OrderService)

  async createOrder ({ body, set }: Context) {
    try {
      const PAYLOAD = body as Order
      const NEW_ORDER = new Order(
        PAYLOAD.canal,
        PAYLOAD.status,
        PAYLOAD.nome,
        PAYLOAD.segmento,
        PAYLOAD.telefone,
        PAYLOAD.mensagem,
        PAYLOAD.produtos,
        PAYLOAD.pagamento,
        PAYLOAD.endereco,
        PAYLOAD.analytics
      )

      const ResponseService = await this._orderService.create(NEW_ORDER)
      if (/^(erro-create-order)$/i.test(String(ResponseService.codigo))) {
        set.status = 400
        return ResponseService
      }

      await RedisClient.publish(
        Order_channel,
        JSON.stringify({
          data: NEW_ORDER
        })
      );

      return ResponseService
    } catch (error) {
      set.status = 500
      console.error("ERROR - OrderController", error)
      return "Erro Server"
    }
  }
}
