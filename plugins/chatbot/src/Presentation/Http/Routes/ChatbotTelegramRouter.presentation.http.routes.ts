import { Elysia, Context } from "elysia";
import { ChatBotTelegramController } from "../Controllers/ChatbotTelegramController.presentation.http.controller";

const router = new Elysia({ prefix: "/tel" });

const controller = new ChatBotTelegramController();

router
  .post("/send", (ctx) => controller.send(ctx as Context));

export {
  router as ChatbotTelegramRouter
}