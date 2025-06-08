import { Product } from "./Product.domain.entities"

export class Order {
  constructor (
    public canal: string,
    public nome: string,
    public segmento: string,
    public status: string,
    public telefone: string,
    public mensagem: string,
    public produtos: Array<{
      id: string,
      name: string,
      price: number,
      quantity: number,
      total: number,
      complements: Array<{
        id: string,
        name: string,
        price: number,
        quantity: number,
      }>
    }>,
    public pagamento: {
      desconto: number
      formaPagamento: string,
      statusPagamento: string,
      valorFrete: number,
      valorProdutos: number,
      valorTotal: number,
    },
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
}