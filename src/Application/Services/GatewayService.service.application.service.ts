import { injectable, inject } from "tsyringe";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { GatewayUseCase } from "../Usecases/GatewayUseCase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { IOrderServices } from "../Contracts/IOrderServices.application.contracts";

interface OrderService extends IOrderServices {}

@injectable()
export class GatewayService {
  constructor (
    private readonly gateway: GatewayUseCase,
    private readonly notify: InternalNotificationServiceAdapter,
    @inject("IOrderServices") private readonly order: OrderService
  ) {}
  async create (id: string): Promise<any> {
    try {
      const order = await this.order.viewById(id);
      if (!order) throw new Error("Pedido não encontrado");

      const responseGateway = await this.gateway.execute(order as Order);
      
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

  async validate (data: any): Promise<any> {
    try {
      const responseGateway = await this.gateway.validate(data);
      if (/^(error-validate-payment-adapter)$/i.test(responseGateway.codigo)) throw new Error("Erro ao buscar dados do pagamento");

      const responseOrderService = await this.order.viewById(data.order_nsu as string);
      if (!responseOrderService) throw new Error("Pedido não encontrado");

      if (
        ![
          responseGateway,
          responseGateway.paid,
          responseGateway.success,
          Number(responseGateway.amount) === Number(responseOrderService.pagamento.valorTotal),
        ].every(o => !!o)
      ) throw new Error("Pagamento não encontrado");

      this.order.update(
        String(data.order_nsu) as string,
        {
          ...responseOrderService,
          pagamento: {
            ...responseOrderService.pagamento,
            statusPagamento: "pago"
          }
        }
      );

      return responseGateway
    } catch (error) {
      console.error("[ERROR GatewayService - validate]", error);
      return await this.notify.send({
        codigo: "error-validate-payment-link",
        mensagem: "Houve um erro ao tentar validar o pagamento."
      });
    }
  }
}