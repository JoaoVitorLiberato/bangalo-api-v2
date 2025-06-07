import { Complement } from "../Entities/Complement.domain.entities";
import { Name } from "../ValueObjects/Name.domain.valuesobjects";
import { Description } from "../ValueObjects/Description.domain.valuesobjects";
import { Price } from "../ValueObjects/Price.domain.valuesobjects";
import { Qtd } from "../ValueObjects/Qtd.domain.valuesobjects";

interface ComplementFactoryProps {
  name: string;
  price: number;
  description: string;
  qtd?: number;
  priceTotal?: number;
}

export class ComplementFactory {
  static save (data: ComplementFactoryProps): Complement {
    const NAME = new Name(data.name);
    const DESCRIPTION = new Description(data.description);
    const PRICE = new Price(data.price);
    const PRICE_TOTAL = data.priceTotal ? new Price(data.priceTotal) : undefined;
    const QTD = data.qtd ? new Qtd(data.qtd) : undefined;

    return new Complement(
      NAME.getValue(), 
      DESCRIPTION.getValue(),
      PRICE.getValue(),
      PRICE_TOTAL?.getValue(),
      QTD?.getValue()
    );
  }
}