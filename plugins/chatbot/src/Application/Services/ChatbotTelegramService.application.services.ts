import { injectable } from "tsyringe";
import { ChatbotUseCase } from "../UseCases/ChatbotUseCase.application.usecases";
import { IChatbotServiceContract } from "../Contracts/ChatbotServiceContract.application.contracts";
import { TelegramAppChat } from "../../Infrastructure/Chats/Telegram/TelegramChat.infrastructure.chats.telegram";
import { ClientTelegramChat } from "../../Infrastructure/Chats/Telegram/ClientTelegramAppChat.infrastructure.chats.telegram";
import { Order } from "../../Domain/Entities/OrderEntity.domain.entities";

@injectable()
export class ChatBotTelegramService implements IChatbotServiceContract {
  _ClientTelegramChat = new TelegramAppChat(ClientTelegramChat)

  constructor (
    private readonly chatbot: ChatbotUseCase
  ) {}

  async validate (): Promise<any> {}

  async send (order: Order): Promise<any> {
    try {
      const responseAdapter = await this.chatbot.send(order);
      const responseTelegram = await this._ClientTelegramChat.sendChat(responseAdapter);

      if (!responseTelegram.success) throw new Error("A mensagem não foi enviada para o Telegram")

      console.log("✅ Mensagem enviada com sucesso");
      return responseTelegram
    } catch {
      console.error("[ChatBotTelegramService - send] ❌ Erro ao enviar mensagem")
    }
  }
}
