import { injectable } from "tsyringe";

import { Order } from "../../../Domain/Entities/Order.domain.entities";
import { IOrderRepository } from "../../../Application/Ports/OrderRepository.application.ports";
import { OrderModel } from "../../Database/Models/Order.infrastructure.database.models";

@injectable()
export class OrderRepository implements IOrderRepository {
  async save (order: Order):Promise<string|Order> {
    return new Promise((resolve) => {
      OrderModel.create({ ...order })
        .then((responseModel) => resolve(responseModel as unknown as Order))
        .catch(e => resolve(`error-create-model ${e}`))
    })
  }
}