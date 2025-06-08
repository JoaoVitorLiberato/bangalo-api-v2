export class Thumbnail {
  public readonly location: string;
  public readonly url: string;
  public readonly upload: boolean;

  constructor(location: string, url: string, upload: boolean) {
    if (!location) {
      throw new Error("Localização inválida.");
    }
    if (!url || url.trim() === "") {
      throw new Error("URL da imagem inválida.");
    }

    this.location = location;
    this.url = url;
    this.upload = upload;
  }

  getValue() {
    return {
      location: this.location,
      url: this.url,
      upload: this.upload
    }
  }
}