import { injectable } from "tsyringe";
import { INotification } from "../../Domain/Usecases/Ports/NotificationsPort.domain.usecases.ports";

@injectable()
export class NotificationServiceAdapter implements INotification {
  send (data: Record<string, string|number|boolean>) {
    return new Promise((resolve) => resolve(data));
  }
}