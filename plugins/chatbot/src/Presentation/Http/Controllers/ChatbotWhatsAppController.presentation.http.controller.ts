import { Context } from "elysia";
import { container } from "tsyringe";
import { ChatBotWhatsAppService } from "../../../Application/Services/ChatbotWhatsAppService.application.services";
import { Order } from "../../../Domain/Entities/OrderEntity.domain.entities";

// dependencies
import "../../../Shared/Containers/Controllers/ChatbotWhatsAppContainer.shared.containers.controller"

export class ChatBotWhatsAppController {
  private readonly _Service = container.resolve(ChatBotWhatsAppService)

  async send ({ body, set }: Context) {
    try {
      return await this._Service.send((body as { to?: string, text: Order }).text)
    } catch (error) {
      console.error("[ERROR ChatBotWhatsAppController - send]", error)
      set.status = 500
      return "ERROR SERVER"
    }
  }
}
