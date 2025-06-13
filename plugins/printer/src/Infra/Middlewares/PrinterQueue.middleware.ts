import { IPrintWorker } from "../Types/PrinterQueue.type"

export const PRINT_QUEUE: Array<IPrintWorker> = []
let processingOrder = false


export async function processQueue (): Promise<void|string|IPrintWorker> {
  if (processingOrder || PRINT_QUEUE.length === 0) return "Vazio"

  processingOrder = true

  const ORDER_PRINTING = PRINT_QUEUE.shift()

  if (ORDER_PRINTING) {
    try {
      await ORDER_PRINTING()
    } catch (err) {
      console.error("Error ao processar impressão")
      return "error-queue-process"
    } finally {
      processingOrder = false
      setTimeout(processQueue, 1200)
    }
  } else {
    return "A fila está vazia."
  }
}