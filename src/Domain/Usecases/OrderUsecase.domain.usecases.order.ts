import { inject, injectable } from "tsyringe";
import { Order } from "../Entities/Order.domain.entities";

export interface IOrderRepository {
  save(order: Order): Promise<Order|string>;
}

@injectable()
export class OrderUseCase {
  constructor (
    @inject("IOrderRepository") private repository: IOrderRepository
  ) {}

  async execute (order: Order) {
    if (!order.valid()) throw new Error("Os dados do seu pedido estão invalidos, verifique-os.");
    return await this.repository.save(order);
  }
}

