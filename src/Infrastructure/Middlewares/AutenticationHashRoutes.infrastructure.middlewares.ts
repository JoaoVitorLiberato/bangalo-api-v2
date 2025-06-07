import { injectable } from "tsyringe";
import { Context } from "elysia";
import { container } from "tsyringe";
import CryptoJS from "crypto-js";
import { UserService } from "../../Application/Services/UserService.application.service";

// Dependencies
import "../../Shared/Containers/Middlewares/AutenticationHashRoutesContainer.shared.container.middleware"

@injectable()
export class AutenticationHashMiddleware {
  private _service = container.resolve(UserService);
  
  async validate ({ request, set }: Context) {
    const AUTHORIZATION = request.headers.get("Authorization");

    if (!AUTHORIZATION) {
      set.status = 401;
      return {
        mensagem: "Usuário não autorizado."
      }
    }

    const TOKEN = AUTHORIZATION.split(" ")[1];
    const DECRYPTED_TOKEN = CryptoJS.AES.decrypt(
      TOKEN as string,
      process.env.APPLICATION_SECRET_KEY as string
    ).toString(CryptoJS.enc.Utf8);


    if (!DECRYPTED_TOKEN) {
      set.status = 401;
      return {
        mensagem: "Usuário não autorizado."
      }
    }

    const USER = await this._service.findById(DECRYPTED_TOKEN);

    if (!USER) {
      set.status = 401;
      return {
        mensagem: "Usuário não autorizado."
      }
    }
  }
}