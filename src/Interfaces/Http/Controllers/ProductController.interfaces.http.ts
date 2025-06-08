import { container } from "tsyringe";
import { Context } from "elysia";

import { Product } from "../../../Domain/Entities/Product.domain.entities";
import { ProductService } from "../../../Application/Services/ProductService.application.service";
import { IStorageBangalo } from "../../../Application/Contracts/IStorageBangalo.application.contracts";

// Dependencies
import "../../../Shared/Containers/Controllers/ProductContainer.shared.containers.controller"

export class ProductController {
  private readonly _service = container.resolve(ProductService);
  private readonly _storage = container.resolve<IStorageBangalo>("IStorageBangalo");

  async create ({ body, set}: Context) {
    try {
      const FORMDATA = body as { product: string, image: File }
      const PRODUCT = JSON.parse(FORMDATA.product) as Product
      const IMAGE = FORMDATA.image as File

      if (PRODUCT.tumbnail.upload) {
        const responseService = await this._storage.upload(IMAGE, "products")

        if (responseService && responseService.codigo && /^error-upload-image$/.test(responseService.codigo)) {
          set.status = 400
          return responseService
        }

        PRODUCT.tumbnail.url = (responseService || { path: "" }).path
      }

      const responseService = await this._service.create(PRODUCT as Product);

      if (/^(erro-create-product)$/i.test(String(responseService.codigo))) set.status = 400

      return responseService
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }

  async views ({ set }: Context) {
    try {
      const responseService = await this._service.views();

      if (responseService && responseService.codigo && /^(error-views-product)$/i.test(responseService.codigo)) set.status = 400
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404

      return responseService
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }

  async viewById ({ params, set }: Context) {
    try {
      const responseService = await this._service.viewById(params.id);

      if (responseService && responseService.codigo && /^(error-view-by-id-product)$/i.test(responseService.codigo)) set.status = 400
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404

      return responseService
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }

  async update ({ params, body, set }: Context) {
    try {
      const FORMDATA = body as { product: string, image: File }
      const PRODUCT = JSON.parse(FORMDATA.product) as Product
      const IMAGE = FORMDATA.image as File

      if (PRODUCT.tumbnail.upload) {
        const responseService = await this._storage.upload(IMAGE, "products")

        if (responseService && responseService.codigo && /^error-upload-image$/.test(responseService.codigo)) {
          set.status = 400
          return responseService
        }

        PRODUCT.tumbnail.url = (responseService || { path: "" }).path
      }

      const responseService = await this._service.update(params.id, PRODUCT as Product);

      if (responseService && responseService.codigo && /^(error-update-product)$/i.test(responseService.codigo)) set.status = 400
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404

      return responseService
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }

  async delete ({ params, set }: Context) {
    try {
      const responseService = await this._service.delete(params.id);

      if (responseService && responseService.codigo && /^(error-delete-product)$/i.test(responseService.codigo)) set.status = 400
      if (responseService && responseService.codigo && /^(product-not-found)$/i.test(responseService.codigo)) set.status = 404

      return responseService
    } catch (error) {
      console.error("ERROR [ProductController]", error);
      set.status = 500
      return "Erro Server";
    }
  }
}

