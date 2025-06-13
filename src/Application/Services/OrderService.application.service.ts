import { injectable } from "tsyringe";

import { Order } from "../../Domain/Entities/Order.domain.entities";
import { OrderUseCase } from "../Usecases/OrderUsecase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { RedisPublish } from "../../Infrastructure/Redis/RedisPublish.infrastructure.redis";
import { IOrderServices } from "../Contracts/IOrderServices.application.contracts";
import { ChatbotNotificationUseCase } from "../Usecases/ChatbotUserCase.applicaiton.usecases";

@injectable()
export class OrderService implements IOrderServices {
  constructor (
    private _service: OrderUseCase,
    private notify: InternalNotificationServiceAdapter,
    private redisPublish: RedisPublish,
    private chatbot: ChatbotNotificationUseCase
  ) {}

  async create (order: Order): Promise<any> {
    try {
      const responseRepository = await this._service.create(order);
      if (/^(error-create-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar criar um pedido.");

      await this.redisPublish.publish(responseRepository as Order);
      await this.chatbot.send("tel/send", responseRepository as Order)
      await this.chatbot.send("wpp/send", responseRepository as Order)

      return await this.notify.send({
        mensagem: "Produco criado com sucesso",
        data: {
          id: (responseRepository as Order).id as string,
        }
      });
    } catch (error) {
      console.error("[ERROR OrderService - create]", error);
      return await this.notify.send({
        codigo: "erro-create-order",
        mensagem: "Houve um erro ao tentar criar um pedido",
      });
    }
  }

  async views (): Promise<any> {
    try {
      const responseRepository = await this._service.views();
      if (/^(error-views-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar visualizar os pedidos.");

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - views]", error);
      return await this.notify.send({
        codigo: "erro-views-order",
        mensagem: "Houve um erro ao tentar visualizar os pedidos",
      });
    }
  }

  async viewById (id: string): Promise<any> {
    try {
      const responseRepository = await this._service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewById]", error);
      return await this.notify.send({
        codigo: "erro-view-by-id-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async viewByPhone (phone: string): Promise<any> {
    try {
      const responseRepository = await this._service.viewByPhone(phone);
      if (/^(error-view-by-phone-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewByPhone]", error);
      return await this.notify.send({
        codigo: "erro-view-by-phone-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async viewToday (): Promise<any> {
    try {
      const responseRepository = await this._service.viewToday();
      if (/^(error-view-today-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      return responseRepository;
    } catch (error) {
      console.error("[ERROR OrderService - viewToday]", error);
      return await this.notify.send({
        codigo: "erro-view-today-order",
        mensagem: "Houve um erro ao tentar visualizar o pedido.",
      });
    }
  }

  async update (id: string, order: Order): Promise<any> {
    try {
      const responseCacheRepository = await this._service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseCacheRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseCacheRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      const responseRepository = await this._service.update(id, order);
      if (/^(error-update-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar atualizar o pedido.");

      return await this.notify.send({
        mensagem: "Pedido atualizado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR OrderService - update]", error);
      return await this.notify.send({
        codigo: "erro-update-order",
        mensagem: "Houve um erro ao tentar atualizar o pedido.",
      });
    }
  }

  async delete (id: string): Promise<any> {
    try {
      const responseCacheRepository = await this._service.viewById(id);
      if (/^(error-view-by-id-order-model)$/i.test(String(responseCacheRepository))) throw new Error("Houve um erro ao tentar visualizar o pedido.");

      if (!responseCacheRepository) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado.",
        });
      }

      const responseRepository = await this._service.delete(id);
      if (/^(error-delete-order-model)$/i.test(String(responseRepository))) throw new Error("Houve um erro ao tentar deletar o pedido.");

      return await this.notify.send({
        mensagem: "Pedido deletado com sucesso."
      });
    } catch (error) {
      console.error("[ERROR OrderService - delete]", error);
      return await this.notify.send({
        codigo: "erro-delete-order",
        mensagem: "Houve um erro ao tentar deletar o pedido.",
      });
    }
  }
}