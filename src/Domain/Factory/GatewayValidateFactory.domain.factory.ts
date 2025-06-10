import { GatewayValidate } from "../Entities/GatewayValidate.domain.entities"; 

interface IGatewayValidateFactoryProps {
  transaction_id: string;
  slug: string;
  order_nsu: string;
}

export class GatewayValidateFactory {
  private static validate (data: IGatewayValidateFactoryProps): string|boolean {
    if (!data.transaction_id || typeof data.transaction_id !== 'string' || data.transaction_id.trim() === '') {
      return "Transaction ID é obrigatório";
    }
  
    if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
      return "Slug é obrigatório";
    }
  
    if (!data.order_nsu || typeof data.order_nsu !== 'string' || data.order_nsu.trim() === '') {
      return "Order NSU é obrigatório";
    }
  
    return true;
  }

  static save (data: IGatewayValidateFactoryProps): GatewayValidate {
    const validate = this.validate(data);
    if (typeof validate === 'string') throw new Error(validate);

    return new GatewayValidate(data.transaction_id, data.slug, data.order_nsu);
  }
}