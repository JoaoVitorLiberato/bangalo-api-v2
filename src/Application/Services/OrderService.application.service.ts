import { injectable } from "tsyringe";

import { Order } from "../../Domain/Entities/Order.domain.entities";
import { OrderUseCase } from "../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters";
import { Order_channel, RedisClient } from "../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";

@injectable()

export class OrderService {
  constructor (
    private order: OrderUseCase,
    private notify: InternalNotificationServiceAdapter
  ) {}

  async create (order: Order): Promise<any> {
    try {
      await this.order.execute(order);
      await RedisClient.publish(Order_channel, JSON.stringify({ data: order }));

      return await this.notify.send({
        mensagem: "Produco criado com sucesso"
      });
    } catch (error) {
      console.error("[ERROR OrderService]", error);
      return await this.notify.send({
        codigo: "erro-create-order",
        mensagem: "Houve um erro ao tentar criar um pedido",
      });
    }
  }
}