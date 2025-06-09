import { inject, injectable } from "tsyringe";
import { IGatewayPort } from "../../Domain/Ports/Gateways/GatewayPort.domain.ports.gateways";
import { Order } from "../../Domain/Entities/Order.domain.entities";

interface IGatewayUse extends IGatewayPort {}

@injectable()
export class GatewayUseCase {
  constructor (
    @inject ("IGatewayPort") private gateway: IGatewayUse) {}

  async execute (order: Order): Promise<any> {
    return await this.gateway.create(order);
  }

  async validate (data: any): Promise<any> {
    return await this.gateway.validate(data);
  }
}
