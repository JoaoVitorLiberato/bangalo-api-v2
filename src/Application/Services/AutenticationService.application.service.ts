import { injectable } from "tsyringe";
import { AutenticationUserCase } from "../../Domain/Usecases/AutenticationUserCase.domain.usecases";
import { NotificationServiceAdapter } from "../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters";
import { User } from "../../Domain/Entities/User.domain.entities";
import argon2 from "argon2";
import CryptoJS from "crypto-js";

@injectable()
export class AutenticationService {
  constructor (
    private autentication: AutenticationUserCase,
    private notify: NotificationServiceAdapter
  ) {}

  async login (email: string, password: string): Promise<any> {
    try {
      const responseRepository = await this.autentication.login(email, password);
      if (/^(user-not-found)$/i.test(String(responseRepository))) throw Error("Usuário não encontrado");

      const USER = responseRepository as User;
      const VALIDATE_PASSWORD = await argon2.verify(USER.password, password);

      if (!VALIDATE_PASSWORD) {
        return await this.notify.send({
          codigo: "error-autentication-user",
          mensagem: "Email ou senha inválida"
        });
      }

      const HASH = CryptoJS.AES.encrypt(
        String(USER.id),
        process.env.APPLICATION_SECRET_KEY as string,
      ).toString();

      return await this.notify.send({
        mensagem: "Login realizado com sucesso",
        token: HASH
      });
    } catch (error) {
      console.error("[ERROR AutenticationService]", error);
      return await this.notify.send({
        codigo: "error-login-user",
        mensagem: "Houve um erro ao tentar fazer login"
      });
    }
  }
}