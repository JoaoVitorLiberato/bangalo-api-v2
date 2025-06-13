export type IOrderData = {
  canal: string;
  nome: string;
  segmento: string;
  status: string;
  telefone: string;
  mensagem: string;
  produtos: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    complements: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  }>;
  pagamento: {
    desconto: number;
    formaPagamento: string;
    statusPagamento: string;
    valorFrete: number;
    valorProdutos: number;
    valorTotal: number;
    recebido?: {
      capture_method: string;
      transaction_id: string;
      slug: string;
      order_nsu: string;
      receipt_url: string;
    };
  };
  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    numero: string;
    complemento: string;
    referencia: string;
  };
  analytics: {
    source: string;
    medium: string;
    campaign: string;
    params: Record<string, string | number | boolean>;
  };
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
