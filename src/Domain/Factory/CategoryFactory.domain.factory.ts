import { Category } from "../Entities/Cotegory.domain.entities";
import { Name } from "../ValueObjects/Name.domain.valuesobjects";

interface CategoryFactoryProps {
  name: string;
}

export class CategoryFactory {
  static save (data: CategoryFactoryProps): Category {
    const NAME = new Name(data.name);

    return new Category(
      NAME.getValue(),
    );
  }
}