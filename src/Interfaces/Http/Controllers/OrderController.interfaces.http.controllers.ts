
import { container } from "tsyringe";
import { Context } from "elysia";
import { NotificationServiceAdapter } from "../../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { OrderUseCase } from "../../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { OrderRepository } from "../../../Infrastructure/Repositories/Order.infrastructure.repositories";
import { Order } from "../../../Domain/Entities/Order.domain.entities";
import { IOrderRepository } from "../../../Domain/Usecases/OrderUsecase.domain.usecases.order";

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
      const DTO = body as Order
      const PAYLOAD = new Order(
        DTO.canal,
        DTO.status,
        DTO.nome,
        DTO.segmento,
        DTO.telefone,
        DTO.mensagem,
        DTO.produtos,
        DTO.pagamento,
        DTO.endereco,
        DTO.analytics
      )

      const ResponseService = await this._orderService.create(PAYLOAD)
      if (/^(erro-create-order)$/i.test(String(ResponseService.codigo))) {
        set.status = 400
        return ResponseService
      }

      return ResponseService
    } catch (error) {
      set.status = 500
      console.error("ERROR - OrderController", error)
      return "Erro Server"
    }
  }
}
