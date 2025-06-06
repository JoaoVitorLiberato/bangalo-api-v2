export class User {
  constructor (
    public email: string,
    public password: string,
    public details: {
      name: string,
      age: number,
      phone: string,
      thumbnail: {
        location: "users",
        url_image: string
      },
    },
    public id?: string,
  ) {}

  valid (): boolean {
    // Validação do email
    const emailRegex = /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i;
    if (!this.email || typeof this.email !== 'string' || !emailRegex.test(this.email)) {
      return false;
    }

    // Validação da senha
    if (!this.password || typeof this.password !== 'string' || this.password.length < 8) {
      return false;
    }

    // Validação dos detalhes do usuário
    if (!this.details) {
      return false;
    }

    // Validação do nome
    const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]{2,}(?:\s[a-záàâãéèêíïóôõöúçñ]{2,})*$/i;
    if (!this.details.name || typeof this.details.name !== 'string' || !nameRegex.test(this.details.name)) {
      return false;
    }

    // Validação da idade
    if (!this.details.age || typeof this.details.age !== 'number' || this.details.age < 18) {
      return false;
    }

    // Validação do telefone
    const phoneRegex = /^(0?\(?[0-9]{2}\)?[0-9]{5}-?[0-9]{4})$/i;
    if (!this.details.phone || typeof this.details.phone !== 'string' || !phoneRegex.test(this.details.phone)) {
      return false;
    }

    // Validação da thumbnail
    // if (!this.details.thumbnail || typeof this.details.thumbnail !== 'object') {
    //   return false;
    // }

    // if (this.details.thumbnail.location !== 'users') {
    //   return false;
    // }

    // if (!this.details.thumbnail.url_image || typeof this.details.thumbnail.url_image !== 'string' || this.details.thumbnail.url_image.trim() === '') {
    //   return false;
    // }

    return true;
  }
}