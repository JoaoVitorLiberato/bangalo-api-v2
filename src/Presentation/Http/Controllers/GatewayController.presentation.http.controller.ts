import { Context } from "elysia";
import { container } from "tsyringe"
import { GatewayService } from "../../../Application/Services/GatewayService.service.application.service";
import { GatewayValidate } from "../../../Domain/Entities/GatewayValidate.domain.entities";

import "../../../Shared/Containers/Controllers/GatewayContainer.shared.containers.controller"

export class GatewayController {
  private _service = container.resolve(GatewayService);

  async create ({ body, set }: Context) {
    try {
      const responseService = await this._service.create((body as { id: string }).id as string);

      if (responseService && responseService.codigo && /^(error-generate-payment-link)$/i.test(responseService.codigo)) set.status = 400;
      if (responseService && responseService.codigo && /^(error-order-not-found)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;
    } catch (error) {
      console.error("[ERROR GatewayController - create]", error);
      set.status = 500;
      return "Erro server"
    }
  }

  async validate ({ body, set }: Context) {
    try {
      const responseService = await this._service.validate(body as GatewayValidate);

      if (/^(error-validate-payment-link)$/i.test(responseService.codigo)) set.status = 400;
      if (/^(order-not-found|payment-not-found)$/i.test(responseService.codigo)) set.status = 404;

      return responseService;

    } catch (error) {
      console.error("[ERROR GatewayController - update]", error);
      set.status = 500;
      return "Erro server"
    }
  }
}
