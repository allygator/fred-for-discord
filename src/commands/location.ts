import Discord from "discord.js";

/**
 * Responds to "where" with the host name of the machine Fred is running on
 * @param message
 */
export function location(message: Discord.Message) {
  var os = require("os");
  var hostname = os.hostname();
  return message.channel.send(hostname);
}
