import { injectable } from "tsyringe";
import { IAutenticationRepository } from "../../Domain/Usecases/AutenticationUseCase.domain.usecases";
import { UserModel } from "../Database/Models/User.infrastructure.database.models";
import { User } from "../../Domain/Entities/User.domain.entities";

@injectable()
export class AutenticationRepository implements IAutenticationRepository {
  async login (email: string, password: string): Promise<User|string> {
    return new Promise((resolve) => {
      UserModel.findOne({ where: { email } })
        .then((responseService) => {
          if (!responseService) resolve("user-not-found");

          resolve(responseService as unknown as User);
        }).catch((error) => {
          console.error("[ERROR AutenticationRepository]", error);
          resolve("error-login-user-model");
        })
    })
  }
}