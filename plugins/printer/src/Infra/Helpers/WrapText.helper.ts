export function wrapText(text: string, lineLength: number): string[] {
  const LINES: string[] = []
  for (let i = 0; i < text.length; i += lineLength) {
    LINES.push(text.substring(i, i + lineLength))
  }
  return LINES
}
