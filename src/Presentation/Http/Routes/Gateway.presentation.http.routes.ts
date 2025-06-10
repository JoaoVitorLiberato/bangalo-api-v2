import { Elysia, Context, t } from "elysia";
import { GatewayController } from "../Controllers/GatewayController.presentation.http.controller";

const controller = new GatewayController();

const router = new Elysia()
  .post(
    "/payment/start", (ctx) => controller.create(ctx as Context),
    {
      tags: ["Gateway"],
      detail: {
        summary: "Inicia o processo de pagamento",
        description: "Inicia o processo de pagamento",
      },
      body: t.Object({
        id: t.String()
      })
    }
  )
  .post(
    "/payment/validate", (ctx) => controller.validate(ctx as Context),
    {
      tags: ["Gateway"],
      detail: {
        summary: "Validar o pagamento",
        description: "Valida o pagamento e atualiza o status do pedido",
      },
      body: t.Object({
        transaction_id: t.String(),
        slug: t.String(),
        order_nsu: t.String(),
        capture_method: t.String(),
        receipt_url: t.String(),
      })
    }
  )

export {
  router as RouteGateway
}