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
    return [
      /^(([a-zA-Z0-9][-_.]{0,1}){0,63})([^\W_])+@([a-zA-Z0-9]{1,63})(\.[a-zA-Z0-9]{2,63})+$/i.test(String(this.email)),
      String(this.password).length >= 8,
      /^[a-záàâãéèêíïóôõöúçñ]{2,}(?:\s[a-záàâãéèêíïóôõöúçñ]{2,})*$/i.test(String(this.details.name)),
      this.details.age >= 18,
      /^(0?\(?[0-9]{2}\)?[0-9]{5}-?[0-9]{4})$/i.test(String(this.details.phone))
    ].every(o => !!o);
  }
}