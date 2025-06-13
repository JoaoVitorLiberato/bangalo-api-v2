import { injectable } from "tsyringe";
import { IChatbotNotificationPort } from "../../../../Domain/Ports/Notifications/IChatBotOrderNotificationPort.domian.ports.notifications";
import { Order } from "../../../../Domain/Entities/Order.domain.entities";
import axios from "axios";

@injectable()
export class ChatbotNotificationAdapter implements IChatbotNotificationPort {
  async send(path: string, order: Order): Promise<void> {
    try {
      await axios.post(`${process.env.CHATBOT_SERVICE}/${path}`,
        {
          text: order,
          to: ""
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      console.log(`✅ Pedido enviado com sucesso para o chatbot`)
    } catch (error) {
      console.error("[ERROR - ChatbotNotificationAdapter - send]", error)
    }
  }
}