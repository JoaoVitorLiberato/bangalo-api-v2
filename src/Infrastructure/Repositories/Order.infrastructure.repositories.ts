import { Op } from "sequelize";
import { Order } from "../../Domain/Entities/Order.domain.entities";
import { IOrderRepository } from "../../Application/Usecases/OrderUsecase.application.usecases";
import { OrderModel } from "../Database/Models/Order.infrastructure.database.models";

import {
  formatDateToYYYYMMDD,
  formatDateToYYYYMMDDPlusDay,
  formatDateToYYYYMMDDMinusDay
} from "../../Shared/Utils/FormatDateToYYYYMMDD.shared.utils";

export class OrderRepository implements IOrderRepository {
  private readonly today = formatDateToYYYYMMDD;
  private readonly nextDay = formatDateToYYYYMMDDPlusDay;

  async create (order: Order):Promise<string|Order> {
    return new Promise((resolve) => {
      OrderModel.create({
        ...order,
        createdAt: formatDateToYYYYMMDDMinusDay,
      })
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

  async viewById (id: string): Promise<Order|string> {
    return new Promise((resolve) => {
      OrderModel.findByPk(id)
        .then((responseModel) => resolve(responseModel as unknown as Order))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewById", error);
          resolve(`error-view-by-id-order-model`)
        })
    });
  }

  async viewByPhone (phone: string): Promise<Order[]|string> {
    return new Promise((resolve) => {
      console.log(`anntes ${this.today} depois ${this.nextDay}`)
      OrderModel.findAll({
        where: {
          telefone: phone,
          createdAt: {
            [Op.between]: [`${this.today}T04:00:00`, `${this.nextDay}T03:59:59`]
          }
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewByPhone", error);
          resolve(`error-view-by-phone-order-model`)
        })
    });
  }
  async viewToday (): Promise<Order[]|string> {
    return new Promise((resolve) => {
      OrderModel.findAll({
        where: {
          createdAt: {
            [Op.between]: [`${this.today}T16:00:00`, `${this.nextDay}T03:59:59`]
          }
        }
      })
        .then((responseModel) => resolve(responseModel as unknown as Order[]))
        .catch((error) => {
          console.error("ERROR - OrderRepository - viewByPhone", error);
          resolve(`error-view-by-phone-order-model`)
        })
    });
  }

  async update (id: string, order: Order): Promise<string> {
    return new Promise((resolve) => {
      OrderModel.update({ ...order }, { where: { id } })
        .then((responseModel) => resolve("Pedido atualizado com sucesso."))
        .catch((error) => {
          console.error("ERROR - OrderRepository - update", error);
          resolve(`error-update-order-model`)
        })
    });
  }

  async delete (id: string): Promise<string> {
    return new Promise((resolve) => {
      OrderModel.destroy({ where: { id } })
        .then((responseModel) => resolve("Pedido deletado com sucesso."))
        .catch((error) => {
          console.error("ERROR - OrderRepository - delete", error);
          resolve(`error-delete-order-model`)
        })
    });
  }
}