import { inject, injectable } from "tsyringe";
import { OrderFactory } from "../Factory/OrderFactory.domain.factory";
import { Order } from "../Entities/Order.domain.entities";

export interface IOrderRepository {
  create (order: Order): Promise<Order|string>;
  views (): Promise<Order[]|string>;
}

@injectable({})
export class OrderUseCase {
  constructor (
    @inject("IOrderRepository") private repository: IOrderRepository
  ) {}

  async create (order: Order) {
    const dto = OrderFactory.save(order);
    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }
}

