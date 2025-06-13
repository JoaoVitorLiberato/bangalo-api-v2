import { Order } from "../Entities/OrderEntity.domain.entities";

export interface IOrderChatbotPort {
  send (order: Order): Promise<any>;
}
