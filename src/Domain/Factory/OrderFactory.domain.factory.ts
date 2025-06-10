import { Order } from "../Entities/Order.domain.entities";

interface IOrderFactoryProps {
  canal: string,
  nome: string,
  segmento: string,
  status: string,
  telefone: string,
  mensagem: string,
  produtos: Array<{
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
    }>,
  }>,
  pagamento: {
    formaPagamento: string,
    statusPagamento: string,
    valorFrete: number,
    valorProdutos: number,
    valorTotal: number,
    desconto: number
    recebido?: {
      capture_method: string,
      transaction_id: string,
      slug: string,
      order_nsu: string,
      receipt_url: string
    }
  },
  endereco: {
    cep: string,
    logradouro: string,
    bairro: string,
    cidade: string,
    uf: string,
    numero: string,
    complemento: string,
    referencia: string
  },
  analytics: {
    source: string,
    medium: string,
    campaign: string,
    params: Record<string, string|number|boolean>
  },
}

function validate (data: IOrderFactoryProps): string|boolean {
  if (!data.canal || typeof data.canal !== 'string' || data.canal.trim() === '') {
    return "Canal é obrigatório";
  }

  if (!data.nome || typeof data.nome !== 'string' || data.nome.trim() === '') {
    return "Nome é obrigatório";
  }

  if (!data.segmento || typeof data.segmento !== 'string' || data.segmento.trim() === '') {
    return "Segmento é obrigatório";
  }

  if (!data.status || typeof data.status !== 'string' || data.status.trim() === '') {
    return "Status é obrigatório";
  }

  const phoneRegex = /^[0-9]{10,11}$/;
  if (!data.telefone || !phoneRegex.test(data.telefone.replace(/\D/g, ''))) {
    return "Telefone é obrigatório";
  }

  // Validação dos produtos
  if (!Array.isArray(data.produtos) || data.produtos.length === 0) {
    return "Produtos é obrigatório";
  }

  // Validação do pagamento
  if (!data.pagamento || typeof data.pagamento.valorTotal !== 'number' || data.pagamento.valorTotal <= 0) {
    return "Pagamento é obrigatório";
  }

  // Validação do endereço
  if (!data.endereco) {
    return "Endereço é obrigatório";
  }

  const cepRegex = /^[0-9]{8}$/;
  if (!data.endereco.cep || !cepRegex.test(data.endereco.cep.replace(/\D/g, ''))) {
    return "CEP é obrigatório";
  }

  if (!data.endereco.logradouro || data.endereco.logradouro.trim() === '') {
    return "Logradouro é obrigatório";
  }

  if (!data.endereco.bairro || data.endereco.bairro.trim() === '') {
    return "Bairro é obrigatório";
  }

  if (!data.endereco.cidade || data.endereco.cidade.trim() === '') {
    return "Cidade é obrigatória";
  }

  if (!data.endereco.uf || data.endereco.uf.trim() === '' || data.endereco.uf.length !== 2) {
    return "UF é obrigatória";
  }

  if (!data.endereco.numero || data.endereco.numero.trim() === '') {
    return "Número de endereço é obrigatório";
  }

  // Validação do analytics
  if (!data.analytics) {
    return "Analytics é obrigatório";
  }

  return true;
}

export class OrderFactory {
  static save (data: IOrderFactoryProps): Order {
    const VALIDATION = validate(data);
    if (typeof VALIDATION === "string") {
      throw new Error(VALIDATION);
    }

    const CANAL = data.canal;
    const NOME = data.nome;
    const SEGMENTO = data.segmento;
    const STATUS = data.status;
    const TELEFONE = data.telefone;
    const MENSAGEM = data.mensagem;
    const PRODUTOS = data.produtos;
    const PAGAMENTO = data.pagamento;
    const ENDERECO = data.endereco;
    const ANALYTICS = data.analytics;

    return new Order(
      CANAL,
      NOME,
      SEGMENTO,
      STATUS,
      TELEFONE,
      MENSAGEM,
      PRODUTOS,
      PAGAMENTO,
      ENDERECO,
      ANALYTICS
    );
  }
}
