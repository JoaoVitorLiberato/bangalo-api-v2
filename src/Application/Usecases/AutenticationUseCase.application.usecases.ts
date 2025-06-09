import { inject, injectable } from "tsyringe";
import { Autentication } from "../../Domain/Entities/Autentication.domain.entities";
import { User } from "../../Domain/Entities/User.domain.entities";

export interface IAutenticationRepository {
  login: (email: string, password: string) => Promise<User|string>
}

@injectable()
export class AutenticationUserCase {
  constructor (
    @inject("IAutenticationRepository") private repository: IAutenticationRepository
  ) {}

  async login (email: string, password: string) {
    const autentication = new Autentication(email, password);
    if (autentication.valid() !== true) throw new Error(autentication.valid() as string);
    return await this.repository.login(email, password);
  }
}