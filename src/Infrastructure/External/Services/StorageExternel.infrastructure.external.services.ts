import axios from "axios"
import FormData from "form-data"


export const storageService = axios.create({
  baseURL: process.env.STORAGE_SERVICE
})

export async function uploadToStorage(file: File, folder: string): Promise<Record<string, string | boolean | number> | undefined> {
  try {
    const UPLOAD = new FormData();
    UPLOAD.append("image", file.stream(), file.name);

    const RESPONSE_PLUGIN = await storageService.post(`/upload/${folder}`, UPLOAD, {
      headers: {
        ...UPLOAD.getHeaders(),
      },
    });

    if ("path" in RESPONSE_PLUGIN.data) return RESPONSE_PLUGIN.data;
  } catch {
    return {
      message: "Houve um erro ao tentar fazer o upload.",
      codigo: "error-upload-image",
    };
  }
}

export async function findImageStream(pathImage: string): Promise<ReadableStream | undefined> {
  try {
    const response = await storageService.get(`/upload/${pathImage}`, {
      responseType: "stream",
    });

    return response.data;
  } catch {
    return undefined;
  }
}