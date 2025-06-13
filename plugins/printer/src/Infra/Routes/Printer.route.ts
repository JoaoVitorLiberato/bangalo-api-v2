import { Elysia, Context, t } from "elysia"
import { PrinterController } from "../Controllers/Printer.controller"

const router = new Elysia()
const controller = new PrinterController()

router.post("/print",
  (config) => controller.printer(config as Context),
  {
    body: t.Object({
      consumidor: t.Object({
        nome: t.String(),
        telefone: t.String(),
        endereco: t.String(),
      }),
      order: t.Object({
        id: t.String(),
        items: t.Array(
          t.Object({
            id: t.String(),
            name: t.String(),
            price: t.String(),
            optionals: t.Optional(
              t.Array(
                t.Object({
                  id: t.String(),
                  name: t.String(),
                  price: t.String(),
                })
              ),
            )
          }),
        ),
        observation: t.String(),
      }),
      loja: t.Optional(
        t.Object({
          mesa: t.String()
        })
      )
    }),
    response: {
      200: t.Object({
        codigo: t.String({ description: "pedidoimprimido" }),
        messagem: t.String()
      }),
      400: t.Object({
        pedido: t.Optional(t.String()),
        codigo: t.String({ description: "erroimprimirpedido" }),
        messagem: t.String()
      })
    },
    headers: t.Object({
      "x-api-key": t.String({ description: "Adicionar a chave key" })
    })
  }
)


export {
  router as PrinterRouter
}