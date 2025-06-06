import { Context } from "elysia";
import { container } from "tsyringe";
import CryptoJS from "crypto-js";
import { NotificationServiceAdapter } from "../Adapters/NotificationAdapter.infrastructure.adapters";
import { UserRepository } from "../Repositories/User.infrastructure.repositories";
import { UserService } from "../../Application/Services/UserService.application.service";

container.registerSingleton<UserRepository>(UserRepository)
container.registerSingleton<NotificationServiceAdapter>(NotificationServiceAdapter)
container.registerSingleton<UserService>(UserService)

export class AutenticationHashMiddleware {
  private _serviceUser = container.resolve(UserService);
  
  async validate ({ request, set }: Context) {
    const AUTHORIZATION = request.headers.get("Authorization");

    if (!AUTHORIZATION) {
      set.status = 401;
      return {
        codigo: "Unauthorized"
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
        codigo: "Unauthorized"
      }
    }

    const USER = await this._serviceUser.findById(DECRYPTED_TOKEN);

    if (!USER) {
      set.status = 401;
      return {
        codigo: "Unauthorized"
      }
    }
  }
}