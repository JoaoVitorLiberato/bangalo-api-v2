import { injectable } from "tsyringe";
import axios from "axios"
import { IStorageBangalo } from "../../../../Application/Contracts/IStorageBangalo.application.contracts";
import { InternalNotificationServiceAdapter } from "../../Internal/Notifications/InternalNotificationAdapter.infrastructure.adapters";

export const storageBangalo = axios.create({
  baseURL: process.env.STORAGE_SERVICE
})

@injectable()
export class StorageBangaloAdapter implements IStorageBangalo {
  private readonly _notification = new InternalNotificationServiceAdapter();

  async upload(file: File, folder: string): Promise<any> {
    try {
      const UPLOAD = new FormData();
      UPLOAD.append("image", file);
  
      const RESPONSE_PLUGIN = await storageBangalo.post(`/upload/${folder}`, UPLOAD);

      if ("path" in RESPONSE_PLUGIN.data) return RESPONSE_PLUGIN.data;
    } catch (error) {
      console.error("ERROR [StorageBangaloAdapter - upload]", error);
      return await this._notification.send({
        codigo: "error-upload-image",
        mensagem: "Houve um erro ao tentar fazer o upload."
      });
    }
  }

  async view (path: string): Promise<any> {
    try {
      const response = await storageBangalo.get(`/upload/${path}`, {
        responseType: "stream",
      });

      return response.data;
    } catch (error) {
      console.error("ERROR [StorageBangaloAdapter - view]", error);
      return await this._notification.send({
        codigo: "error-upload-image",
        mensagem: "Houve um erro ao tentar fazer o upload."
      });
    }
  }
}
