import { Order } from "../../Entities/Order.domain.entities";

export interface IChatbotNotificationPort {
  send (path: string, order: Order): promise<void>
}
