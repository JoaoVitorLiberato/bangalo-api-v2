import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IOrderRepository {
  save(order: Order): Promise<Order|string>;
}