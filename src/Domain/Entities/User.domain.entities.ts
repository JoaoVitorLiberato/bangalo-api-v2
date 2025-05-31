export class User {
  constructor (
    public email: string,
    public password: string,
    public details: {
      name: string,
      age: number,
      phone: string
      thumbnail: {
        location: string,
        url_image: string
      },
    },
    public id?: string,
  ) {}
}