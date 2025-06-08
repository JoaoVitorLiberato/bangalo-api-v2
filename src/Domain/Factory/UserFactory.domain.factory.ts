import { User } from "../Entities/User.domain.entities";
import { Email } from "../ValueObjects/Email.domain.valuesobjects";
import { Password } from "../ValueObjects/Password.domain.valuesobjects";
import { Name } from "../ValueObjects/Name.domain.valuesobjects";
import { Phone } from "../ValueObjects/Phone.domain.valuesobjects";
import { Thumbnail } from "../ValueObjects/Tumbnail.domain.valuesobjects";
import { Age } from "../ValueObjects/Age.domain.valuesobjects";

interface UserFactoryProps {
  email: string;
  password: string;
  details: {
    name: string;
    age: number;
    phone: string;
    thumbnail: {
      location: string;
      url: string;
      upload: boolean;
    };
  }
}

export class UserFactory {
  static save (data: UserFactoryProps): User {
    const EMAIL = new Email(data.email);
    const PASSWORD = new Password(data.password);
    const NAME = new Name(data.details.name);
    const AGE = new Age(data.details.age);
    const PHONE = new Phone(data.details.phone);
    const THUMBNAIL = data.details.thumbnail ? new Thumbnail(
      data.details.thumbnail.location,
      data.details.thumbnail.url,
      data.details.thumbnail.upload
    ) : new Thumbnail("users", "", false);

    return new User(
      EMAIL.getValue(),
      PASSWORD.getValue(),
      {
        name: NAME.getValue(),
        age: AGE.getValue(),
        phone: PHONE.getValue(),
        thumbnail: {
          location: "users" as const,
          url: THUMBNAIL.getValue().url,
          upload: THUMBNAIL.getValue().upload
        }
      }
    );
  }
}