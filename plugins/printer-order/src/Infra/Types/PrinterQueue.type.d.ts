export type IPrintWorker = () => Promise<void|string>

export type IMiddlewarePrinting = {
  codigo: string,
  messagem: string
  pedido?: string
}