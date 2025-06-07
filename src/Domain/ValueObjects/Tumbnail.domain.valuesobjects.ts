export class Thumbnail {
  public readonly location: string;
  public readonly url_image: string;

  constructor(location: string, url_image: string) {
    if (location !== "users") {
      throw new Error("Localização inválida.");
    }
    if (!url_image || url_image.trim() === "") {
      throw new Error("URL da imagem inválida.");
    }

    this.location = location;
    this.url_image = url_image;
  }
}