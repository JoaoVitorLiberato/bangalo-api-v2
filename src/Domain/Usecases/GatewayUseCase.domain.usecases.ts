import { ICheckoutGateway } from "../Ports/CheckoutGeteway/CheckoutGateway.domain.ports.checkoutgateway";
import { Order } from "../Entities/Order.domain.entities";

export class GatewayUseCase {
  constructor (private readonly gateway: ICheckoutGateway) {}

  async execute (order: Order): Promise<any> {
    return await this.gateway.create(order);
  }
}
