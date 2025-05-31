export class Payment {
  constructor (
    public formaPagamento: string,
    public statusPagamento: string,
    public valorFrete: number,
    public valorProdutos: number,
    public valorTotal: number,
  ) {}
}