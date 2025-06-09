import { inject, injectable } from "tsyringe";
import { OrderFactory } from "../../Domain/Factory/OrderFactory.domain.factory";
import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IOrderRepository {
  create (order: Order): Promise<Order|string>;
  views (): Promise<Order[]|string>;
  viewById (id: string): Promise<Order|string>;
  viewByPhone (phone: string): Promise<Order[]|string>;
  viewToday (): Promise<Order[]|string>;
  update (id: string, order: Order): Promise<string>;
  delete (id: string): Promise<string>;
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

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async viewByPhone (phone: string) {
    return await this.repository.viewByPhone(phone);
  }

  async viewToday () {
    return await this.repository.viewToday();
  }

  async update (id: string, order: Order) {
    return await this.repository.update(id, order);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}

