import { Elysia, Context } from "elysia";
import { GatewayController } from "../Controllers/GatewayController.presentation.http.controller";

const controller = new GatewayController();

const router = new Elysia()
  .post("/payment/start", (ctx) => controller.create(ctx as Context))
  .post("/payment/validate", (ctx) => controller.validate(ctx as Context))

export {
  router as RouteGateway
}