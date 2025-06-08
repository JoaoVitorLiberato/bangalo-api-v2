import { Order } from "../../Entities/Order.domain.entities";

export interface ICheckoutGateway {
  create (order: Order): Promise<any>;
}