import { inject, injectable } from "tsyringe"
import { Order } from "../../Domain/Entities/OrderEntity.domain.entities";
import { IOrderChatbotPort } from "../../Domain/Ports/OrderPort.domain.ports";
import { OrderSendFactory } from "../../Domain/Factory/OrderSendFactory.domain.factory";

interface IOrderChatbot extends IOrderChatbotPort {}

@injectable()
export class ChatbotUseCase {
  constructor (
    @inject("IOrderChatbotPort") private chatbot: IOrderChatbot
  ) {}

  async send (order: Order): Promise<any> {
    const dto = OrderSendFactory.save(order);
    return await this.chatbot.send(dto);
  }
}
