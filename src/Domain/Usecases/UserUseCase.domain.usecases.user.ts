import { inject, injectable } from "tsyringe";
import argon2 from "argon2";
import { User } from "../Entities/User.domain.entities";

export interface IUserRepository {
  save: (user: User) => Promise<User|string>,
  users: () => Promise<User[]|string>,
  user: (id: string) => Promise<User|string>,
  cache: (id: string) => Promise<User|string>,
  update: (id:string, user: User) => Promise<string>
}

@injectable({})
export class UserUseCase {
  constructor (
    @inject("IUserRepository") private repository: IUserRepository
  ) {}

  async save (user: User) {
    if (!user.valid()) throw new Error("Os dados do usuário estão invalidos, verifique-os.");

    const PASSWORD_ENCRYPTED = await argon2.hash(user.password);

    const dto = {
      ...user,
      password: PASSWORD_ENCRYPTED
    }

    return await this.repository.save(dto as User);
  }

  async findAll () {
    return await this.repository.users();
  }

  async findById (id: string) {
    return await this.repository.user(id);
  }

  async findCacheById (id: string) {
    return await this.repository.cache(id);
  }

  async update (id:string, user:User) {
    if (!user.valid()) throw new Error("Os dados do usuário estão invalidos, verifique-os.");
    return await this.repository.update(id, user);
  }
}