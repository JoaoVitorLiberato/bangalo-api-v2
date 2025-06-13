import { injectable } from "tsyringe";
import { ChatbotUseCase } from "../UseCases/ChatbotUseCase.application.usecases";
import { IChatbotServiceContract } from "../Contracts/ChatbotServiceContract.application.contracts";
import { WhatsAppChat } from "../../Infrastructure/Chats/Wpp/WhatsChat.infrastructure.chats.wpp";
import { ClientWhatsAppChat } from "../../Infrastructure/Chats/Wpp/ClientWhatAppChat.infrastructure.chats.wpp";
import { Order } from "../../Domain/Entities/OrderEntity.domain.entities";

@injectable()
export class ChatBotWhatsAppService implements IChatbotServiceContract {
  _ClientWppChat = new WhatsAppChat(ClientWhatsAppChat)

  constructor (
    private readonly chatbot: ChatbotUseCase
  ) {}

  async validate (): Promise<any> {}

  async send (order: Order): Promise<any> {
    try {
      const responseAdapter = await this.chatbot.send(order);
      const responseWhatsApp = await this._ClientWppChat.sendChat(responseAdapter);

      if (!responseWhatsApp.success) throw new Error("A mensagem não foi enviada para WhatsApp")

      console.log("✅ Mensagem enviada com sucesso");
      return responseWhatsApp
    } catch {
      console.error("[ChatBotWhatsAppService - send] ❌ Erro ao enviar mensagem")
    }
  }
}
