import { inject, injectable } from "tsyringe";
import argon2 from "argon2";
import { User } from "../Entities/User.domain.entities";
import { UserFactory } from "../Factory/UserFactory.domain.factory";

export interface IUserRepository {
  save: (user: User) => Promise<User|string>,
  users: () => Promise<User[]|string>,
  user: (id: string) => Promise<User|string>,
  cache: (id: string) => Promise<User|string>,
  update: (id:string, user: User) => Promise<string>
  updatePassword: (id:string, data:{ password: string, newPassword: string }) => Promise<string>,
  delete: (id: string) => Promise<string>,
}

@injectable({})
export class UserUseCase {
  constructor (
    @inject("IUserRepository") private repository: IUserRepository
  ) {}

  async save (user: User) {
    const PASSWORD_ENCRYPTED = await argon2.hash(user.password);

    const dto = UserFactory.save({
      email: user.email,
      password: PASSWORD_ENCRYPTED,
      datails: {
        name: user.details.name,
        age: user.details.age,
        phone: user.details.phone,
        thumbnail: {
          location: "users",
          url: user.details.thumbnail?.url || ""
        },
      }
    })

    return await this.repository.save(dto);
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
    const dto = UserFactory.save({
      email: user.email,
      password: user.password,
      datails: {
        name: user.details.name,
        age: user.details.age,
        phone: user.details.phone,
        thumbnail: {
          location: "users",
          url: user.details.thumbnail?.url || ""
        },
      }
    })

    return await this.repository.update(id, dto);
  }

  async updatePassword (id: string, user: { password: string, newPassword: string }) {
    const PASSWORD_ENCRYPTED = await argon2.hash(user.newPassword);

    return await this.repository.updatePassword(id, {
      password: user.password,
      newPassword: PASSWORD_ENCRYPTED
    });
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}