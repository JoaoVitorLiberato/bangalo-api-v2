import { Order } from "../../Domain/Entities/Order.domain.entities";

export interface IOrderServices {
  viewById (id: string): Promise<Order|null>;
  update (id: string, order: Order): Promise<any>;
}