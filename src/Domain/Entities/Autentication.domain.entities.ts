export class Autentication {
  constructor (
    public email: string,
    public password: string
  ) {}

  valid (): boolean|string {
    // Validação do email
    const emailRegex = /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i;
    if (!this.email || typeof this.email !== 'string' || !emailRegex.test(this.email)) {
      return "Email inválido";
    }

    // Validação da senha
    if (!this.password || typeof this.password !== 'string' || this.password.length < 8) {
      return "Senha inválida";
    }

    return true
  }
}