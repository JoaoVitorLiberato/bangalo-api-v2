import { Order } from "../../Domain/Entities/Order.domain.entities";
import { IOrderRepository } from "../../Domain/Usecases/OrderUsecase.domain.usecases.order";
import { OrderModel } from "../Database/Models/Order.infrastructure.database.models";

export class OrderRepository implements IOrderRepository {
  async create (order: Order):Promise<string|Order> {
    return new Promise((resolve) => {
      OrderModel.create({ ...order })
        .then((responseModel) => resolve(responseModel as unknown as Order))
        .catch((error) => {
          console.error("ERROR - OrderRepository - create", error);
          resolve(`error-create-order-model`)
        })
    });
  }

  async views (): Promise<Order[]|string> {
    return new Promise((resolve) => {
      OrderModel.findAll()
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - views", error);
          resolve(`error-views-order-model`)
        })
    });
  }
}