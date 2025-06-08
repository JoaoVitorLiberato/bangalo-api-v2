import { injectable } from "tsyringe";
import { IInternalNotification } from "../../../Domain/Ports/Notifications/NotificationsServicePort.domain.ports.notifications";

@injectable()
export class InternalNotificationServiceAdapter implements IInternalNotification {
  send (data: Record<string, string|number|boolean>) {
    return new Promise((resolve) => resolve(data));
  }
}