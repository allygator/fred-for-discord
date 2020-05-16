import Discord from "discord.js";

/**
 * Responds to Ping with a Pong
 * @param message
 */
export function ping(message: Discord.Message) {
  return message.channel.send("Pong");
}
