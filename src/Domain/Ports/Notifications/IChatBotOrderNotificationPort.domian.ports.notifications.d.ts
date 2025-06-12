import { Order } from "../../Entities/Order.domain.entities";

export interface IChatbotNotificationPort {
  send (order: Order): promise<void>
}