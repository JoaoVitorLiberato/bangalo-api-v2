import { inject, injectable } from "tsyringe";
import argon2 from "argon2"
import { User } from "../Entities/User.domain.entities"

export interface IUserRepository {
  save: (user: User) => Promise<User|string>
}

@injectable({})
export class UserUseCase {
  constructor (
    @inject("IUserRepository") private repository: IUserRepository
  ) {}

  async execute (user: User) {
    if (!user.valid()) throw new Error("Os dados do usuário estão invalidos, verifique-os.");

    const PASSWORD_ENCRYPTED = await argon2.hash(user.password)

    const dto = {
      ...user,
      password: PASSWORD_ENCRYPTED
    }

    return await this.repository.save(dto as User)
  }
}