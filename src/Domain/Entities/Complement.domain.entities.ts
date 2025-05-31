export class Complement {
  constructor (
    public description: string,
    public name: string,
    public price: number,
    public priceTotal?: number,
    public qtd?:number,
    public id?: string,
  ) {}
}