import { Elysia, Context } from "elysia";
import { ChatBotWhatsAppController } from "../Controllers/ChatbotWhatsAppController.presentation.http.controller";

const router = new Elysia({ prefix: "/wpp" });

const controller = new ChatBotWhatsAppController();

router
  .post("/send", (ctx) => controller.send(ctx as Context));

export {
  router as ChatBotWhatsAppRouter
}