import { WechatyBuilder } from "wechaty";
import output from "./output.js";

export function setupWechat() {
  output.log("Setting up Wechaty...");

  const wechatBot = WechatyBuilder.build();
  let scopeRoom = null;

  wechatBot.on("scan", (qrcode, status) => {
    output.success(
      `Scan QR Code to login: \nhttps://wechaty.js.org/qrcode/${encodeURIComponent(
        qrcode
      )}`
    );
  });

  wechatBot
    .on("login", (user) => {
      output.status(`${user.name() + user.id} logged in wechat`);
    })
    .on("logout", (user) => {
      output.status(`${user.name()} logged out wechat`);
    })
    .on("ready", () => {
      output.status("User is ready");
      output.warn(
        "Now, please click into the room you want to forward messages to."
      );
    });

  wechatBot.on("message", async (msg) => {
    if (!scopeRoom && msg.room() && msg.payload.type === 0) {
      output.success(`Room selected: ${await msg.room().topic()}`);
      output.warn(`If you want to change the room, please restart the bot.`);
      scopeRoom = msg.room();

      output.status("Bot is ready to forward messages.");
    }
  });

  wechatBot.start();

  output.status("Wechaty is starting...");

  return {
    send: (msg) => {
      if (!scopeRoom) {
        output.error("No room selected to forward msg.");
        return;
      }
      scopeRoom.say(msg);
    },
  };
}
