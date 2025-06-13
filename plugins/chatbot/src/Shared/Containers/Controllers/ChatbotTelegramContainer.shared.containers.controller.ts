import { container } from "tsyringe";
import { ChatbotUseCase } from "../../../Application/UseCases/ChatbotUseCase.application.usecases";
import { ChatbotAdapter } from "../../../Infrastructure/Adapters/ChatbotAdapter.infrastructure.adapters";
import { ChatBotTelegramService } from "../../../Application/Services/ChatbotTelegramService.application.services";
import { IOrderChatbotPort } from "../../../Domain/Ports/OrderPort.domain.ports";

container.register<IOrderChatbotPort>(
  "IOrderChatbotPort",
  {
    useClass: ChatbotAdapter
  }
)

container.registerSingleton<ChatbotUseCase>(ChatbotUseCase)
container.registerSingleton<ChatbotAdapter>(ChatbotAdapter)
container.registerSingleton<ChatBotTelegramService>(ChatBotTelegramService)
