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

  valid (): boolean {
    // Validação básica dos campos obrigatórios
    if (!this.canal || typeof this.canal !== 'string' || this.canal.trim() === '') {
      return false;
    }

    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      return false;
    }

    if (!this.segmento || typeof this.segmento !== 'string' || this.segmento.trim() === '') {
      return false;
    }

    if (!this.status || typeof this.status !== 'string' || this.status.trim() === '') {
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!this.telefone || !phoneRegex.test(this.telefone.replace(/\D/g, ''))) {
      return false;
    }

    // Validação dos produtos
    if (!Array.isArray(this.produtos) || this.produtos.length === 0) {
      return false;
    }

    // Validação do pagamento
    if (!this.pagamento || typeof this.pagamento.valorTotal !== 'number' || this.pagamento.valorTotal <= 0) {
      return false;
    }

    // Validação do endereço
    if (!this.endereco) {
      return false;
    }

    const cepRegex = /^[0-9]{8}$/;
    if (!this.endereco.cep || !cepRegex.test(this.endereco.cep.replace(/\D/g, ''))) {
      return false;
    }

    if (!this.endereco.logradouro || this.endereco.logradouro.trim() === '') {
      return false;
    }

    if (!this.endereco.bairro || this.endereco.bairro.trim() === '') {
      return false;
    }

    if (!this.endereco.cidade || this.endereco.cidade.trim() === '') {
      return false;
    }

    if (!this.endereco.uf || this.endereco.uf.trim() === '' || this.endereco.uf.length !== 2) {
      return false;
    }

    if (!this.endereco.numero || this.endereco.numero.trim() === '') {
      return false;
    }

    // Validação do analytics
    if (!this.analytics) {
      return false;
    }

    return true;
  }
}