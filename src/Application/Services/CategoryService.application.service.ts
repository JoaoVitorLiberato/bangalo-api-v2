import { injectable } from "tsyringe";
import { CategoryUseCase } from "../../Domain/Usecases/CategoryUseCase.domain.usecases";
import { Category } from "../../Domain/Entities/Cotegory.domain.entities";
import { InternalNotificationServiceAdapter } from "../../Infrastructure/Adapters/Internal/InternalNotificationAdapter.infrastructure.adapters"      ;

@injectable()
export class CategoryService {
  constructor(
    private readonly category: CategoryUseCase,
    private readonly notify: InternalNotificationServiceAdapter
  ) {}

  async create (data: Category): Promise<any> {
    try {
      await this.category.create(data);
      return await this.notify.send({
        mensagem: "Categoria criada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-create-category",
        mensagem: "Erro ao criar categoria",
      });
    }
  }

  async views (): Promise<any> {
    try {
      return await this.category.views();
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-views-category",
        mensagem: "Erro ao buscar categorias",
      });
    }
  }

  async viewById(id: string): Promise<any> {
    try {
      const responseRepository = await this.category.viewById(id);
      if (!responseRepository) {
        return await this.notify.send({
          codigo: "category-not-found",
          mensagem: "Categoria não encontrada",
        });
      }

      return responseRepository;
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-view-category",
        mensagem: "Erro ao buscar categoria",
      });
    }
  }

  async update(id: string, data: Category): Promise<any> {
    try {
      const responseService = await this.viewById(id);
      if (responseService && responseService.codigo && /^(category-not-found)$/i.test(String(responseService.codigo))) {
        return await this.notify.send(responseService);
      }

      await this.category.update(id, data);

      return await this.notify.send({
        mensagem: "Categoria atualizada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-update-category",
        mensagem: "Erro ao atualizar categoria",
      });
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const responseService = await this.viewById(id);
      if (responseService && responseService.codigo && /^(category-not-found)$/i.test(String(responseService.codigo))) {
        return await this.notify.send(responseService);
      }

      await this.category.delete(id);

      return await this.notify.send({
        mensagem: "Categoria deletada com sucesso.",
      });
    } catch (error) {
      console.error("[ERROR CategoryService]", error);
      return await this.notify.send({
        codigo: "error-delete-category",
        mensagem: "Erro ao deletar categoria",
      });
    }
  }
} 