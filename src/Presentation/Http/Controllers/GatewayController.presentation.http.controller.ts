import { Context } from "elysia";
import { container } from "tsyringe"
import { GatewayService } from "../../../Application/Services/GatewayService.service.application.service";
import { Order } from "../../../Domain/Entities/Order.domain.entities";

import "../../../Shared/Containers/Controllers/GatewayContainer.shared.containers.controller"

export class GatewayController {
  private _service = container.resolve(GatewayService);

  async create ({ body, set }: Context) {
    try {
      const responseService = await this._service.create((body as { id: string }).id as string);

      if (/^(error-generate-payment-link)$/i.test(responseService.codigo)) set.status = 400;

      return responseService;
    } catch (error) {
      console.error("[ERROR GatewayController - create]", error);
      set.status = 500;
      return "Erro server"
    }
  }

  async validate ({ body, set }: Context) {
    try {
      const responseService = await this._service.validate(body);

      // if ()
      return responseService;

    } catch (error) {
      console.error("[ERROR GatewayController - update]", error);
      set.status = 500;
      return "Erro server"
    }
  }
}
