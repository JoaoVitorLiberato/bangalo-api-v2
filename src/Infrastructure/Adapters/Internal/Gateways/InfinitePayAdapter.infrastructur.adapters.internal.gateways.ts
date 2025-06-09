import { ICheckoutGateway } from "../../../../Domain/Ports/CheckoutGeteway/CheckoutGateway.domain.ports.checkoutgateway";
import { Order } from "../../../../Domain/Entities/Order.domain.entities";
import { InternalNotificationServiceAdapter } from "../Notifications/InternalNotificationAdapter.infrastructure.adapters";

export class InfinitePayAdapter  implements ICheckoutGateway {
  private readonly notify = new InternalNotificationServiceAdapter();

  async create (order: Order): Promise<any> {
    try {
      const CART = [];

      for (const product of order.produtos) {
        CART.push({
          name: product.name,
          amount: product.total,
          quantity: 1
        })
      }

      CART.push({
        name: "Frete",
        amount: order.pagamento.valorFrete,
        quantity: 1
      })

      const ADDRESS = `address_cep=${order.endereco.cep}&address_complement=${order.endereco.complemento}&address_number=${order.endereco.numero}&address_neighborhood=${order.endereco.bairro}&address_city=${order.endereco.cidade}&address_state=${order.endereco.uf}`;

      return await this.notify.send({
        link: `https://checkout.infinitepay.io/bangalo-sushi?items=${encodeURIComponent(JSON.stringify(CART))}&order_nsu=${order.id}&redirect_url=https://bangalosushi.app.br/detalhes/pedido&customer_name=${order.nome}&customer_cellphone=${order.telefone}&${ADDRESS}`
      });
    } catch (error) {
      console.error("[ERROR GenerateLinkPaymentInfinityPay]", error);
      return await this.notify.send({
        codigo: "error-generate-link-payment-infinity-pay",
        mensagem: "Houve um erro ao tentar gerar o link de pagamento."
      });
    }
  }

  // statusPaymentInfinityPay (payment: any): Promise<string> {
  //   return new Promise((resolve) => {
  //     // `https://api.infinitepay.io/invoices/public/checkout/payment_check/bangalo-sushi?
  //     // transaction_nsu=${property.transaction_id}&slug=${property.slug}&external_order_nsu=${property.order_nsu}`
  //     resolve("teste");
  //   });
  // }
}
