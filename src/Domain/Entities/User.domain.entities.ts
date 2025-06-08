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
      url: string;
      upload: boolean;
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
        url: string;
        upload: boolean;
      };
    },
    id?: string
  ) {
    this.email = email;
    this.password = password;
    this.details = details;
    this.id = id;
  }
}