import { injectable, inject } from "tsyringe";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { GatewayUseCase } from "../Usecases/GatewayUseCase.application.usecases";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";
import { IOrderServices } from "../Contracts/IOrderServices.application.contracts";
import { GatewayValidate } from "../../Domain/Entities/GatewayValidate.domain.entities";

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
      const responseOrderService = await this.order.viewById(id) as Order;
      if (!responseOrderService) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado"
        });
      };

      const responseGateway = await this.gateway.execute(responseOrderService);

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

  async validate (data: GatewayValidate): Promise<any> {
    try {
      const responseOrderService = await this.order.viewById(data.order_nsu as string);
      if (responseOrderService && ("codigo" in responseOrderService) && /^(error-order-not-found)$/i.test(responseOrderService.codigo as string)) {
        return await this.notify.send({
          codigo: "order-not-found",
          mensagem: "Pedido não encontrado"
        });
      }

      const responseGateway = await this.gateway.validate(data);
      if (/^(error-validate-payment-adapter)$/i.test(responseGateway.codigo)) throw new Error("Erro ao buscar dados do pagamento");

      if (
        ![
          responseOrderService && "pagamento" in responseOrderService,
          responseGateway,
          responseGateway.success,
          responseGateway.paid,
          Number(responseGateway.amount) === Number(responseOrderService?.pagamento.valorTotal),
        ].every(o => !!o)
      ) {
        return await this.notify.send({
          codigo: "payment-not-found",
          mensagem: "Pagamento não encontrado, entre em contato com a loja caso tenha pago."
        });
      }

      const responseUpdateOrderService = await this.order.update(
        String(data.order_nsu) as string,
        {
          ...responseOrderService as Order,
          pagamento: {
            ...(responseOrderService as Order).pagamento,
            statusPagamento: "pago",
            recebido: data
          }
        }
      );

      return responseUpdateOrderService
    } catch (error) {
      console.error("[ERROR GatewayService - validate]", error);
      return await this.notify.send({
        codigo: "error-validate-payment-link",
        mensagem: "Houve um erro ao tentar validar o pagamento."
      });
    }
  }
}