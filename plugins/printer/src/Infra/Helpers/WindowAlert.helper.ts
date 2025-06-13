import { exec } from "child_process"
import readline from 'readline'

export function showWindowsAlert(title: string, message: string) {
  const command = `powershell -Command "& {Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('${message}', '${title}')}"`
  exec(command)
}

export function pauseMessagesWindow () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question("Pressione CTRL + C para sair...", () => {
    rl.close()
  })
}
