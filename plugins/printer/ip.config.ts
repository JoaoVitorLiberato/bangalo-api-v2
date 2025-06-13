import { readFile } from "fs/promises"
import { join } from "path"

export async function printerIP () {
  const FILE = await readFile(join(process.cwd(), "ip.txt"), "utf-8")
  const IP_PRINTER = FILE
    .split(/\r?\n/)
    .map(ip => ip.replace(/[\r\n\x00-\x1F\x7F-\x9F\u200B-\u200D\uFEFF]/g, "").trim())
    .filter(Boolean)

  return IP_PRINTER
}
