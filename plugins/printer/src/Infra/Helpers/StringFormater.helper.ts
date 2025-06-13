export function slugify (str:string) {
  return String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

export function sanitizeText(text: string): string {
  return text.replace(/[^\x00-\x7FÀ-ÿ0-9a-zA-Z \n\r.,;:?!@#$%&*()_+\-]/g, "")
}