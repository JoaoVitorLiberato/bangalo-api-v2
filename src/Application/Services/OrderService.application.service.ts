import { injectable } from "tsyringe";

import { Order } from "../../Domain/Entities/Order.domain.entities";
import { OrderUseCase } from "../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { NotificationServiceAdapter } from "../Adapters/NotificationAdapter.application.adapters";

@injectable()

export class OrderService {
  constructor (
    private order: OrderUseCase,
    private notify: NotificationServiceAdapter
  ) {}

  async create (order: Order): Promise<any> {
    try {
      await this.order.execute(order)
      return await this.notify.send({
        mensagem: "Produco criado com sucesso"
      })
    } catch {
      return await this.notify.send({
        codigo: "erro-create-order",
        mensagem: "Houve um erro ao tentar criar um pedido"
      })
    }
  }
}