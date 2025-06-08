export class Thumbnail {
  public readonly location: string;
  public readonly url: string;

  constructor(location: string, url: string) {
    if (!location) {
      throw new Error("Localização inválida.");
    }
    if (!url || url.trim() === "") {
      throw new Error("URL da imagem inválida.");
    }

    this.location = location;
    this.url = url;
  }
}