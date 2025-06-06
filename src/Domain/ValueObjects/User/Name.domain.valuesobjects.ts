export class Name {
  private readonly name: string;

  constructor(name: string) {
    const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]{2,}(?:\s[a-záàâãéèêíïóôõöúçñ]{2,})*$/i;
    if (!name || !nameRegex.test(name)) {
      throw new Error("Nome inválido.");
    }
    this.name = name;
  }

  getValue(): string {
    return this.name;
  }
}