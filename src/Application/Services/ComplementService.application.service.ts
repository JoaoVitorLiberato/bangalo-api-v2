import { injectable } from "tsyringe";
import { ComplementUseCase } from "../../Domain/Usecases/ComplementUseCase.domain.usecases";
import { Complement } from "../../Domain/Entities/Complement.domain.entities";
import { NotificationServiceAdapter } from "../../Infrastructure/Adapters/NotificationAdapter.infrastructure.adapters"      ;

@injectable()
export class ComplementService {
  constructor(
    private readonly complement: ComplementUseCase,
    private readonly notify: NotificationServiceAdapter
  ) {}

  async create (data: Complement): Promise<any> {
    try {
      await this.complement.create(data);
      return await this.notify.send({
        mensagem: "Complemento criado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-create-complement",
        mensagem: "Erro ao criar complemento",
      });
    }
  }

  async views (): Promise<any> {
    try {
      return await this.complement.views();
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-views-complement",
        mensagem: "Erro ao buscar complementos",
      });
    }
  }

  async viewById(id: string): Promise<any> {
    try {
      return await this.complement.viewById(id);
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-view-complement",
        mensagem: "Erro ao buscar complemento",
      });
    }
  }

  async update(id: string, data: Complement): Promise<any> {
    try {
      await this.complement.update(id, data);

      return await this.notify.send({
        mensagem: "Complemento atualizado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-update-complement",
        mensagem: "Erro ao atualizar complemento",
      });
    }
  }

  async delete(id: string): Promise<any> {
    try {
      await this.complement.delete(id);

      return await this.notify.send({
        mensagem: "Complemento deletado com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR ComplementService]", error);
      return await this.notify.send({
        codigo: "error-delete-complement",
        mensagem: "Erro ao deletar complemento",
      });
    }
  }
} 