import { Order } from "../../Domain/Entities/OrderEntity.domain.entities";

export interface IChatbotServiceContract {
  send (order: Order): Promise<any>;
}
