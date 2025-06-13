import { Elysia } from "elysia"
import dotenv from "dotenv"
import { swagger } from "@elysiajs/swagger"
import { cors } from "@elysiajs/cors"
import { PrinterRouter } from "./Infra/Routes/Printer.route"

dotenv.config()

const app = new Elysia({
  serve: {
    idleTimeout: 30
  }
})
  .onBeforeHandle(({ request, set }) => {
    const TOKEN = request.headers.get("x-api-key")

    if (String(TOKEN) !== String(process.env.APPLICATION_API_KEY)) {
      console.error("Usuário não autorizado")

      set.status = 401
      return {
        codigo: "unauthorized",
        mensagem: "Usuário não autorizado"
      }
    }
  })
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Pluguin Documentation",
          version: "1.0.0"
        },
      },
    })
  )
  .use(PrinterRouter)

export default app
