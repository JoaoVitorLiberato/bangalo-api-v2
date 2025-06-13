import { ThermalPrinter, PrinterTypes, BreakLine, CharacterSet } from "node-thermal-printer"

export const configPrinter = (ip:string) => {
  return new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: String(ip),
    removeSpecialCharacters: true,
    breakLine: BreakLine.WORD,
    characterSet: CharacterSet.PC437_USA,
    options: {
      timeout: 30000,
    }
  })
}
