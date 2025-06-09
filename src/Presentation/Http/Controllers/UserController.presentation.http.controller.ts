import { container } from "tsyringe";
import { Context } from "elysia";

import { User } from "../../../Domain/Entities/User.domain.entities";
import { UserService } from "../../../Application/Services/UserService.application.service";
import { StorageBangaloAdapter } from "../../../Infrastructure/Adapters/External/Storage/StorageBangalo.infrastructure.adapters.external.storage";

// Dependencies
import "../../../Shared/Containers/Controllers/UserContainer.shared.containers.controller"

export class UserController {
  private _service = container.resolve(UserService)
  private _storage = container.resolve(StorageBangaloAdapter)

  async create ({ body, set }: Context) {
    try {
      const FORMDATA = body as { user: string, image: File }
      const PAYLOAD = JSON.parse(FORMDATA.user) as User
      const IMAGE = FORMDATA.image as File

      if (PAYLOAD.details.thumbnail?.upload) {
        const responseStorage = await this._storage.upload(IMAGE, "users")
        
        if (responseStorage && responseStorage.codigo && /^(error-upload-image)$/i.test(responseStorage.codigo)) {
          set.status = 400
          return responseStorage
        }

        PAYLOAD.details.thumbnail.url = responseStorage.path
      }

      const responseService = await this._service.create(PAYLOAD);

      if (responseService && responseService.codigo && /^(error-create-user)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - UserController create", error);
      return "Erro Server";
    }
  }

  async views ({ set }: Context) {
    try {
      const responseService = await this._service.views();
      if (responseService && responseService.codigo && /^(error-find-all-users)$/i.test(String(responseService.codigo))) set.status = 400;

      return responseService
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController findAllUsers", error);
      return "Erro Server";
    }
  }

  async veiwById ({ params, set }: Context) {
    try {
      const ID = params.id as string
      const responseService = await this._service.veiwById(ID);
      
      if (responseService && responseService.codigo && /^(error-find-user-by-id)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController findUserById", error);
      return "Erro Server";
    }
  }

  async update ({ body, params, set }: Context) {
    try {
      const ID = params.id as string
      const FORMDATA = body as { user: string, image: File }
      const PAYLOAD = JSON.parse(FORMDATA.user) as User
      const IMAGE = FORMDATA.image as File

      if (PAYLOAD.details.thumbnail?.upload) {
        const responseStorage = await this._storage.upload(IMAGE, "users")
        
        if (responseStorage && responseStorage.codigo && /^(error-upload-image)$/i.test(responseStorage.codigo)) {
          set.status = 400
          return responseStorage
        }

        PAYLOAD.details.thumbnail.url = responseStorage.path
      }

      const responseService = await this._service.update(ID, PAYLOAD);

      if (responseService && responseService.codigo && /^(error-update-user)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController createUser", error);
      return "Erro Server";
    }
  }

  async updatePassword ({ body, params, set }: Context) {
    try {
      const ID = params.id as string
      const PAYLOAD = body as { password: string, newPassword: string }

      const responseService = await this._service.updatePassword(ID, PAYLOAD);

      if (responseService && responseService.codigo && /^(error-update-password-user)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(password-invalid)$/i.test(String(responseService.codigo))) set.status = 401;
      if (responseService && responseService.codigo && /^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController updatePassword", error);
      return "Erro Server";
    }
  }
  
  async delete ({ params, set }: Context) {
    try {
      const ID = params.id as string

      const responseService = await this._service.delete(ID);

      if (responseService && responseService.codigo && /^(error-delete-user)$/i.test(String(responseService.codigo))) set.status = 400;
      if (responseService && responseService.codigo && /^(user-not-found)$/i.test(String(responseService.codigo))) set.status = 404;

      return responseService;
    } catch (error) {
      set.status = 500;
      console.error("ERROR - OrderController deleteUser", error);
      return "Erro Server";
    }
  }
}