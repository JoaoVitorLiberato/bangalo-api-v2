import { container } from "tsyringe";
import { Context } from "elysia";

import { AutenticationService } from "../../../Application/Services/AutenticationService.application.service";
import { Autentication } from "../../../Domain/Entities/Autentication.domain.entities";

// Dependencies
import "../../../Shared/Containers/AutenticationContainer.shared.containers"

export class AutenticationController {
  private _autenticationService = container.resolve(AutenticationService);

  async login ({ body, set, store }: Context) {
    try {
      const dto = body as Autentication;
      const ResponseService = await this._autenticationService.login(dto.email, dto.password);

      if (/^(error-autentication-user)$/i.test(String(ResponseService.codigo))) {
        set.status = 401;
        return ResponseService;
      }

      if (/^(error-login-user)$/i.test(String(ResponseService.codigo))) {
        set.status = 400;
        return ResponseService;
      }

      return ResponseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - AutenticationController", error);
      return "Erro Server";
    }
  }
}