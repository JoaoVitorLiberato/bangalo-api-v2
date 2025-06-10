import { IGatewayInfinitePayDto } from "../../Presentation/Dtos/IGatewayInfinitePay.presentation.dto";

export class GatewayValidate implements IGatewayInfinitePayDto {
  public readonly transaction_id: string;
  public readonly slug: string;
  public readonly order_nsu: string;
  public readonly capture_method: string;
  public readonly receipt_url: string;

  constructor(transaction_id: string, slug: string, order_nsu: string, capture_method: string, receipt_url: string) {
    this.transaction_id = transaction_id;
    this.slug = slug;
    this.order_nsu = order_nsu;
    this.capture_method = capture_method;
    this.receipt_url = receipt_url;
  }
}