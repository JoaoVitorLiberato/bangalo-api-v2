
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
      console.error("ERROR - OrderController - create", error);
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
      console.error("ERROR - OrderController - views", error);
      return "Erro Server";
    }
  }

  async viewById ({ params, set }: Context) {
    try {
      const ResponseService = await this._service.viewById(params.id as string);

      if (/^(error-view-by-id-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (/^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewById", error);
      return "Erro Server";
    }
  }

  async viewByPhone ({ params, set }: Context) {
    try {
      const ResponseService = await this._service.viewByPhone(params.phone as string);

      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;
      if (ResponseService && ResponseService.codigo && /^(error-view-by-phone-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewByPhone", error);
      return "Erro Server";
    }
  }

  async viewToday ({ set }: Context) {
    try {
      const ResponseService = await this._service.viewToday();
      if (ResponseService && ResponseService.codigo && /^(error-view-today-order)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - viewByPhone", error);
      return "Erro Server";
    }
  }

  async update ({ params, body, set }: Context) {
    try {
      const ResponseService = await this._service.update(params.id as string, body as Order);

      if (ResponseService && ResponseService.codigo && /^(error-update-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - update", error);
      return "Erro Server";
    }
  }

  async delete ({ params, set }: Context) {
    try {
      const ResponseService = await this._service.delete(params.id as string);

      if (ResponseService && ResponseService.codigo && /^(error-delete-order)$/i.test(String(ResponseService.codigo))) set.status = 400;
      if (ResponseService && ResponseService.codigo && /^(order-not-found)$/i.test(String(ResponseService.codigo))) set.status = 404;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController - delete", error);
      return "Erro Server";
    }
  }
}
