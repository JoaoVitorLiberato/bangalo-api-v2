import { Payment } from "./Payment.domain.entities"
import { Product } from "./Product.domain.entities"

export class Order {
  constructor (
    public canal: string,
    public nome: string,
    public segmento: string,
    public status: string,
    public telefone: string,
    public mensagem: string,
    public produtos: Product[],
    public pagamento: Payment,
    public endereco: {
      cep: string,
      logradouro: string,
      bairro: string,
      cidade: string,
      uf: string,
      numero: string,
      complemento: string,
      referencia: string
    },
    public analytics: {
      source: string,
      medium: string,
      campaign: string,
      params: Record<string, string|number|boolean>
    },
    public id?: string,
  ) {}

  validate (): boolean {
    return  [
      this.canal !== "",
      this.nome !== "",
      this.segmento !== "",
      this.telefone !== "",
      this.produtos.length > 0,
      this.pagamento.valorTotal !== 0,
    ].every(o => !!o)

  }
}