import { injectable } from "tsyringe";
import { INotification } from "../../../Domain/Ports/Notifications/NotificationsServicePort.domain.ports.notifications";

@injectable()
export class InternalNotificationServiceAdapter implements INotification {
  send (data: Record<string, string|number|boolean>) {
    return new Promise((resolve) => resolve(data));
  }
}