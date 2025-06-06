
import { container } from "tsyringe";
import { Context } from "elysia";

import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { Order } from "../../../Domain/Entities/Order.domain.entities";

// Dependencies
import "../../../Shared/Containers/OrderContainer.shared.containers"

export class OrderController {
  private _orderService = container.resolve(OrderService)

  async createOrder ({ body, set }: Context) {
    try {
      const dto = body as Order
      const PAYLOAD = new Order(
        dto.canal,
        dto.status,
        dto.nome,
        dto.segmento,
        dto.telefone,
        dto.mensagem,
        dto.produtos,
        dto.pagamento,
        dto.endereco,
        dto.analytics
      );

      const ResponseService = await this._orderService.create(PAYLOAD);
      if (/^(erro-create-order)$/i.test(String(ResponseService.codigo))) {
        set.status = 400;
        return ResponseService;
      }

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController", error);
      return "Erro Server";
    }
  }
}
