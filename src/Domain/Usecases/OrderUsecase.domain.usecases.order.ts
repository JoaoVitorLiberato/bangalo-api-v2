import { inject, injectable } from "tsyringe";
import { Order } from "../Entities/Order.domain.entities";
// import { IOrderRepository } from "../../Application/Ports/OrderRepository.application.ports";

export interface IOrderRepository {
  save(order: Order): Promise<Order|string>;
}

@injectable()
export class OrderUseCase {
  constructor (
    @inject("IOrderRepository") private repo: IOrderRepository
  ) {}

  async execute (order: Order) {
    if (!order.validate()) throw new Error("Pedido invalido");
    return await this.repo.save(order);
  }
}