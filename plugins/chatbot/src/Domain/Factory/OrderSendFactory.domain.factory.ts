import { Order } from "../Entities/OrderEntity.domain.entities";

function validate (data: Order): string|boolean {
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

  if (!Array.isArray(data.produtos) || data.produtos.length === 0) {
    return "Produtos é obrigatório";
  }

  if (!data.pagamento || typeof data.pagamento.valorTotal !== 'number' || data.pagamento.valorTotal <= 0) {
    return "Pagamento é obrigatório";
  }

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

  return true;
}

export class OrderSendFactory {
  static save (order: Order): Order {
    const VALIDATION = validate(order);
    if (typeof VALIDATION === "string") {
      throw new Error(VALIDATION);
    }

    const CANAL = order.canal;
    const NOME = order.nome;
    const SEGMENTO = order.segmento;
    const STATUS = order.status;
    const TELEFONE = order.telefone;
    const MENSAGEM = order.mensagem;
    const PRODUTOS = order.produtos;
    const PAGAMENTO = order.pagamento;
    const ENDERECO = order.endereco;
    const ANALYTICS = order.analytics;
    const CREATED_AT = order.createdAt;
    const UPDATED_AT = order.updatedAt;

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
      ANALYTICS,
      CREATED_AT,
      UPDATED_AT
    );
  }
}
