import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

export const client = new Client({
    authStrategy: new LocalAuth(),
});

let myChatId;

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message", (message) => {
    console.log(message.body);
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});