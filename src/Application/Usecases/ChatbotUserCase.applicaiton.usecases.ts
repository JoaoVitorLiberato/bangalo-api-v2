import { inject, injectable } from "tsyringe";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { IChatbotNotificationPort } from "../../Domain/Ports/Notifications/IChatBotOrderNotificationPort.domian.ports.notifications";

interface IChatbotNotification extends IChatbotNotificationPort {}

@injectable()
export class ChatbotNotificationUseCase {
  constructor (
    @inject("IChatbotNotificationPort") private chatbot: IChatbotNotification
  ) {}

  async send (path: string, order: Order): Promise<void> {
    return await this.chatbot.send(path, order)
  }
}