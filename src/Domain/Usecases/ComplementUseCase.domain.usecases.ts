import { injectable, inject } from "tsyringe";
import { Complement } from "../Entities/Complement.domain.entities";
import { ComplementFactory } from "../Factory/ComplementFactory.domain.factory";

export interface IComplementRepository {
  create: (complement: Complement) => Promise<Complement|string>;
  views: () => Promise<Complement[]|string>;
  viewById: (id: string) => Promise<Complement|string>;
  update: (id: string, data: Complement) => Promise<Complement|string>;
  delete: (id: string) => Promise<string>;
}

@injectable()
export class ComplementUseCase {
  constructor(
    @inject("IComplementRepository") private repository: IComplementRepository
  ) {}

  async create (data:Complement) {
    const dto = ComplementFactory.save({
      description: data.description,
      name: data.name,
      price: data.price,
      priceTotal: data?.priceTotal,
      qtd: data?.qtd
    });

    return await this.repository.create(dto);
  }

  async views () {
    return await this.repository.views();
  }

  async viewById (id: string) {
    return await this.repository.viewById(id);
  }

  async update (id: string, data: Complement) {
    const dto = ComplementFactory.save({
      description: data.description,
      name: data.name,
      price: data.price,
      priceTotal: data?.priceTotal,
      qtd: data?.qtd
    });

    return await this.repository.update(id, dto);
  }

  async delete (id: string) {
    return await this.repository.delete(id);
  }
}
