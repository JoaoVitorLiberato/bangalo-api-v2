export class User {
  public readonly id?: string;
  public readonly email: string;
  public readonly password: string;
  public readonly details: {
    name: string;
    age: number;
    phone: string;
    thumbnail?: {
      location: "users";
      url_image: string;
    };
  };

  constructor(
    email: string,
    password: string,
    details: {
      name: string;
      age: number;
      phone: string;
      thumbnail?: {
        location: "users";
        url_image: string;
      };
    },
    id?: string
  ) {
    this.email = email;
    this.password = password;
    this.details = details;
    this.id = id;

    this.validate();
  }

  private validate(): void {
    const EMAIL_REGEX =
      /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i;
    const NAME_REGEX =
      /^[a-záàâãéèêíïóôõöúçñ]{2,}(?:\s[a-záàâãéèêíïóôõöúçñ]{2,})*$/i;
    const PHONE_REGEX = /^(0?\(?[0-9]{2}\)?[0-9]{5}-?[0-9]{4})$/i;

    if (!this.email || typeof this.email !== "string" || !EMAIL_REGEX.test(this.email)) {
      throw new Error("Email inválido.");
    }

    if (!this.password || typeof this.password !== "string" || this.password.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }

    if (!this.details || typeof this.details !== "object") {
      throw new Error("Detalhes do usuário são obrigatórios.");
    }

    if (!this.details.name || !NAME_REGEX.test(this.details.name)) {
      throw new Error("Nome inválido. Deve conter pelo menos nome e sobrenome.");
    }

    if (!this.details.age || typeof this.details.age !== "number" || this.details.age < 18) {
      throw new Error("Usuário deve ter pelo menos 18 anos.");
    }

    if (!this.details.phone || !PHONE_REGEX.test(this.details.phone)) {
      throw new Error("Telefone inválido.");
    }

    if (this.details.thumbnail) {
      if (this.details.thumbnail.location !== "users") {
        throw new Error("Localização da imagem inválida.");
      }

      if (
        !this.details.thumbnail.url_image ||
        typeof this.details.thumbnail.url_image !== "string" ||
        this.details.thumbnail.url_image.trim() === ""
      ) {
        throw new Error("URL da imagem inválida.");
      }
    }
  }
}