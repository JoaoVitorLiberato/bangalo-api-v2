import { Order } from "../../Domain/Entities/Order.domain.entities";
import { GatewayUseCase } from "../../Domain/Usecases/GatewayUseCase.domain.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

export class GeneratePaymentLinkService {
  constructor (
    private readonly gateway: GatewayUseCase,
    private readonly notify: InternalNotificationServiceAdapter
  ) {}
  async generatePaymentLink (order: Order): Promise<any> {
    try {
      const responseGateway = await this.gateway.execute(order);
      
      if (/^(error-generate-link-payment-infinity-pay)$/i.test(responseGateway.codigo)) throw new Error("Erro ao gerar link de pagamento");

      return await this.notify.send({
        link: responseGateway.link
      });
    } catch (error) {
      console.error("[ERROR GeneratePaymentLinkService]", error);
      return await this.notify.send({
        codigo: "error-generate-payment-link",
        mensagem: "Erro ao gerar link de pagamento"
      });
    }
  }
}