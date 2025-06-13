import { t } from "elysia"
import app from "./app"
import { pauseMessagesWindow, showWindowsAlert } from "./Infra/Helpers/WindowAlert.helper"
import { configPrinter } from "./Infra/Pluguins/Printer.pluguin"
import { printerIP } from "../ip.config"

app
  .get("/",
    async ({ set }) => {
      try {
        const IPs = await printerIP()
        for (const ip of IPs) {
          const printer = configPrinter(ip)
          const printerConnected  = await printer.isPrinterConnected()
          if (!printerConnected) throw new Error("Impressora desconectada")

          printer.setTextNormal()
          printer.alignCenter()
          printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))
          printer.println("")
          printer.println("Print Teste")
          printer.println("ÁÉÍÓÚ Ç ÃÕ À Â Ê Ô")
          printer.println("")
          printer.println("-".repeat(Number(process.env.APPLICATION_PRINT_LINE_SIZE)))

          printer.cut()
          await printer.execute()
        }

        return {
          codigo: "impressoraconectada",
          messagem: "Impressora conectada com sucesso!"
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
        set.status = 400

        showWindowsAlert("Erro na impressora", "Verifique se a impressora está connectada a rede corretamente")
        return {
          codigo: "impressoranaoconectada",
          messagem: "Verifique se a impressora está connectada a rede corretamente."
        }
      }
    },
    {
      response: {
        200: t.Object({
          codigo: t.String({ description: "impressoraconectada" }),
          messagem: t.String()
        }),
        400: t.Object({
          codigo: t.String({ description: "impressoranaoconectada" }),
          messagem: t.String()
        }),
      },
      headers: t.Object({
        "x-api-key": t.String({ description: "Adicionar a chave key" })
      })
    }
  )
  .listen({
    hostname: "0.0.0.0",
    port: process.env.APPLICATION_PORT as string
  })

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)
pauseMessagesWindow()