export class Complement {
  constructor (
    public name: string,
    public description: string,
    public price: number,
    public priceTotal?: number,
    public qtd?:number,
    public id?: string,
  ) {}
}