import { injectable } from "tsyringe"
import { Order } from "../../Domain/Entities/OrderEntity.domain.entities";
import { IOrderChatbotPort } from "../../Domain/Ports/OrderPort.domain.ports";

@injectable()
export class ChatbotAdapter implements IOrderChatbotPort {
  async send (order: Order) {
    try {
      const endereco = order.endereco;
      const produtos = order.produtos.map((p: any) => {
        const comps = p.complements?.map((c: any) => `    - ${c.name} (${c.quantity}x)`).join('\n') || '';
        return `- ${p.name} (${p.quantity}x)\n${comps}`;
      }).join('\n');

      return (
        `*Novo Pedido Recebido!*\n` +
        `🍽️ *Segmento:* ${order.segmento}\n` +
        `📲 *Canal:* ${order.canal}\n\n` +
        `👤 *Nome:* ${order.nome}\n` +
        `📞 *Telefone:* ${order.telefone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '$1 $2 $3-$4')}\n\n` +
        `🏠 *Endereço:*\n` +
        `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}\n` +
        `${endereco.cidade} - ${endereco.uf}\n` +
        `CEP: ${endereco.cep}\n` +
        `Complemento: ${endereco.complemento}\n` +
        `Referência: ${endereco.referencia}\n\n` +
        `🛒 *Produtos:*\n${produtos}\n\n` +
        `💬 *Mensagem do cliente:*\n${order.mensagem}\n\n` +
        `💰 *Pagamento:*\n` +
        `- Forma: ${order.pagamento.formaPagamento}\n` +
        `- Valor Produtos: R$ ${(order.pagamento.valorProdutos / 100).toFixed(2)}\n` +
        `- Frete: R$ ${(order.pagamento.valorFrete / 100).toFixed(2)}\n` +
        `- Desconto: R$ ${(order.pagamento.desconto / 100).toFixed(2)}\n` +
        `- **Total:** R$ ${(order.pagamento.valorTotal / 100).toFixed(2)}\n` +
        `- Status: ${order.pagamento.statusPagamento}`
      );
    } catch {
      console.log("[ERROR ChatbotAdapter - send]");
      return "Erro para gerar a mensagem WhatsApp.";
    }
  }
}