import { User } from "../Entities/User.domain.entities";
import { Email } from "../ValueObjects/User/Email.domain.valuesobjects";
import { Password } from "../ValueObjects/User/Password.domain.valuesobjects";
import { Name } from "../ValueObjects/User/Name.domain.valuesobjects";
import { Phone } from "../ValueObjects/User/Phone.domain.valuesobjects";
import { Thumbnail } from "../ValueObjects/User/Tumbnail.domain.valuesobjects";
import { Age } from "../ValueObjects/User/Age.domain.valuesobjects";

interface UserFactoryProps {
  email: string;
  password: string;
  datails: {
    name: string;
    age: number;
    phone: string;
    thumbnail?: Thumbnail;
  }
}

export class UserFactory {
  static save (data: UserFactoryProps): User {
    const EMAIL = new Email(data.email);
    const PASSWORD = new Password(data.password);
    const NAME = new Name(data.datails.name);
    const AGE = new Age(data.datails.age);
    const PHONE = new Phone(data.datails.phone);
    const THUMBNAIL = data.datails.thumbnail ? new Thumbnail(data.datails.thumbnail.location, data.datails.thumbnail.url_image) : undefined;

    return new User(
      EMAIL.getValue(),
      PASSWORD.getValue(),
      {
        name: NAME.getValue(),
        age: AGE.getValue(),
        phone: PHONE.getValue(),
        thumbnail: THUMBNAIL ? {
          location: "users",
          url_image: THUMBNAIL.url_image
        } : undefined
      }
    );
  }
}