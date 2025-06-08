import { Product } from "../Entities/Product.domain.entities"
import { Name } from "../ValueObjects/Name.domain.valuesobjects"
import { Thumbnail } from "../ValueObjects/Tumbnail.domain.valuesobjects"
import { Description } from "../ValueObjects/Description.domain.valuesobjects"
import { Price } from "../ValueObjects/Price.domain.valuesobjects"

interface ProductFactoryProps {
  tumbnail: {
    url: string,
    upload: boolean,
    location: "products",
  },
  name: string,
  description: string,
  price: number,
  differences: {
    especial: {
      readonly: boolean,
      input: string,
      active: boolean,
      value: number
    },
    breaded: {
      readonly: boolean,
      input: string,
      active: boolean,
      value: number
    },
    flambed: {
      readonly: boolean,
      input: string,
      active: boolean,
      value: number
    }
  },
  note_client: number,
  category_id: string,
}

export class ProductFactory {
  static save (data: ProductFactoryProps): Product {
    const TUMBNAIL = new Thumbnail(data.tumbnail.location, data.tumbnail.url, data.tumbnail.upload);
    const NAME = new Name(data.name);
    const DESCRIPTION = new Description(data.description);
    const PRICE = new Price(data.price);
    const DIFFERENCES = data.differences;
    const NOTE_CLIENT = data.note_client;
    const CATEGORY_ID = data.category_id;

    return new Product(
      {
        url: TUMBNAIL.url,
        location: TUMBNAIL.location,
        upload: data.tumbnail.upload,
      },
      NAME.getValue(), 
      DESCRIPTION.getValue(),
      PRICE.getValue(),
      DIFFERENCES,
      CATEGORY_ID,
      NOTE_CLIENT,
    );
  }
}