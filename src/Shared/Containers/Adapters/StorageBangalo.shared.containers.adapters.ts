import { container } from "tsyringe";
import { IStorageBangalo } from "../../../Application/Contracts/IStorageBangalo.application.contracts";
import { StorageBangaloAdapter } from "../../../Infrastructure/Adapters/External/Storage/StorageBangalo.infrastructure.adapters.external.storage";
import { InternalNotificationServiceAdapter } from "../../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters";

container.register<IStorageBangalo>("IStorageBangalo", {
  useClass: StorageBangaloAdapter
});

container.registerSingleton<InternalNotificationServiceAdapter>(InternalNotificationServiceAdapter);
container.registerSingleton<StorageBangaloAdapter>(StorageBangaloAdapter);