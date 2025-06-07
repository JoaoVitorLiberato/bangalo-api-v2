import { container } from "tsyringe";
import { Context } from "elysia";

import { AutenticationService } from "../../../Application/Services/AutenticationService.application.service";
import { Autentication } from "../../../Domain/Entities/Autentication.domain.entities";

// Dependencies
import "../../../Shared/Containers/Controllers/AutenticationContainer.shared.containers.controller"

export class AutenticationController {
  private _service = container.resolve(AutenticationService);

  async login ({ body, set }: Context) {
    try {
      const dto = body as Autentication;
      const ResponseService = await this._service.login(dto.email, dto.password);

      if (/^(error-autentication-user)$/i.test(String(ResponseService.codigo))) set.status = 401;

      if (/^(error-login-user)$/i.test(String(ResponseService.codigo))) set.status = 400;

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - AutenticationController", error);
      return "Erro Server";
    }
  }
}