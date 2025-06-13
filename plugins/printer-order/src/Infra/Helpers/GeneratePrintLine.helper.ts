import { IOrderData } from "../Types/Order.type"
import { wrapText } from "./WrapText.helper"
import { formatedPrice } from "./formatedPrice.helper"

export function generatePrintLines(data: IOrderData, maxLength: number): string[] {
  const lines: string[] = []
  const { nome, segmento, status, telefone, mensagem, produtos, pagamento, endereco } = data

  lines.push("")
  lines.push("NOVO PEDIDO")
  lines.push("")
  lines.push("-".repeat(maxLength))

  const nameLines = wrapText(nome, maxLength)
  nameLines.forEach((line, index) =>
    lines.push(index === 0 ? `Nome: ${line}` : `      ${line}`)
  )

  lines.push(`Tel: ${telefone}`)
  lines.push(`Segmento: ${segmento}`)
  lines.push(`Status: ${status}`)
  lines.push("Endereço:")
  const enderecoLines = wrapText(`${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}`, maxLength)
  lines.push(...enderecoLines)

  lines.push("-".repeat(maxLength))
  lines.push("Itens:")

  for (const item of produtos) {
    const itemName = wrapText(item.name, maxLength - 10)
    lines.push(` - ${itemName[0]}  R$ ${item.total}`)
    for (let i = 1; i < itemName.length; i++) {
      lines.push(`   ${itemName[i]}`)
    }

    if (item.complements && item.complements.length > 0) {
      for (const optional of item.complements) {
        const optName = wrapText(optional.name, maxLength - 10)
        lines.push(`  + ${optName[0]}  R$ ${optional.price} x ${optional.quantity}`)
        for (let i = 1; i < optName.length; i++) {
          lines.push(`    ${optName[i]}`)
        }
      }
    }
  }

  lines.push(" ".repeat(maxLength))
  // let valorTotal = 0
  // for (const item of order.items) {
  //   if (item.optionals && item.optionals.length > 0) {
  //     for (const optional of item.optionals) {
  //       const PRICE_PRODUCT = String(item.price).replace(/\.|,/g, "")
  //       const PRICE_COMPLEMENT = String(optional.price).replace(/\.|,/g, "")
  //       valorTotal += (Number(PRICE_PRODUCT) + Number(PRICE_COMPLEMENT))
  //     }
  //   }
  // }
  lines.push(`Total: ${formatedPrice(pagamento.valorTotal)}`)
  lines.push(" ".repeat(maxLength))

  lines.push("-".repeat(maxLength))

  if (mensagem) {
    const obsLines = wrapText(mensagem, maxLength)
    lines.push("Observações:")
    lines.push(...obsLines)
  }

  lines.push("-".repeat(maxLength))
  lines.push(" ")

  return lines
}