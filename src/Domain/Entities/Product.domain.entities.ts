import { Complement } from "./Complement.domain.entities"

export class Product {
  constructor (
    public tumbnail: {
      url: string,
      upload: boolean,
      location: string,
    },
    public name: string,
    public  description: string,
    public price: number,
    public differences: {
      especial: {
        readonly: boolean,
        input: string,
        active: boolean,
        value: number
      },
      breaded: {
        readonly: boolean
        input: string,
        active: boolean,
        value: number
      },
      flambed: {
        readonly: boolean
        input: string,
        active: boolean,
        value: number
      }
    },
    public  categoryId: string,
    public note_client: number,
    public id?: string,
  ) {}
}