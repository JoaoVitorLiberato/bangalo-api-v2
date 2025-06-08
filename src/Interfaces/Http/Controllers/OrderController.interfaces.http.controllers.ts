
import { container } from "tsyringe";
import { Context } from "elysia";

import { OrderService } from "../../../Application/Services/OrderService.application.service";
import { Order } from "../../../Domain/Entities/Order.domain.entities";

// Dependencies
import "../../../Shared/Containers/Controllers/OrderContainer.shared.containers.controller"

export class OrderController {
  private _service = container.resolve(OrderService)

  async create ({ body, set }: Context) {
    try {
      const ResponseService = await this._service.create(body as Order);
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

  async views ({ set }: Context) {
    try {
      const ResponseService = await this._service.views();
      if (/^(error-views-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController", error);
      return "Erro Server";
    }
  }
}
