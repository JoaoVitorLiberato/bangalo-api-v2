import Redis from "ioredis";
import { injectable } from "tsyringe";
import { IEventPublish } from "../../Application/Contracts/IEventPublish.application.contracts";
import { Order } from "../../Domain/Entities/Order.domain.entities";

@injectable()
export class RedisPublish implements IEventPublish {
  private redisClient = new Redis({ host: "redis", port: 6379 });
  private _channel = "order_created";

  async publish (data: Order): Promise<void> {
    await this.redisClient.publish(this._channel, JSON.stringify(data));
  }
}