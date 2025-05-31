import { Complement } from "./Complement.domain.entities"

export class Product {
  constructor (
    public url_image: string,
    public  categoryId: string,
    public name: string,
    public  description: string,
    public price: {
      default: number,
      qtd_product?: number,
      total?: number,
      total_price_complements?: number
      discount: {
        active: boolean,
        value: number
      },
    },
    public complements: Complement[],
    public differences: {
      especial: {
        readonly: boolean,
        input: string,
        active: boolean,
        additional: number
      },
      breaded: {
        readonly: boolean
        input: string,
        active: boolean,
        additional: number
      },
      flambed: {
        readonly: boolean
        input: string,
        active: boolean,
        additional: number
      }
    },
    public note_client: number,
    public upload: boolean,
    public id?: string,
  ) {}
}