import Discord from "discord.js";
import prisma from "../utils/prisma";
import { prefix } from "../config.json";

/**
 * Responds to two formats of "keys"
 * No additional message: Lists all saved keys (type 1)
 * Further data: creates a database entry for the specified user's warcraft mythic keystone (type 2)
 * Message format: keys [dungeon name [level number]}
 * @param message
 */
export const keys = async (message: Discord.Message) => {
  //Formats the message to remove nonalpha characters except spaces, and dashes
  const items = message.content.replace(/[^\w\s\-]/gi, "").split(" ");
  //Check if the message is type 1 or 2
  if (
    (items[0].toLowerCase() == prefix && items.length < 3) ||
    (items[0] == "keys" && items.length < 2)
  ) {
    let returnmsg = "";
    const allKeys = await prisma.keys.findMany();
    for (let key of allKeys) {
      returnmsg += key.name + ": " + key.dungeon + " +" + key.level + "\n";
    }
    if (returnmsg.length == 0) {
      return message.channel.send("No keys logged");
    } else {
      return message.channel.send(returnmsg);
    }
  } else {
    //Remove the "keys" and "fred" prefix from the message
    for (let i = 0; i < items.length; i++) {
      if (items[i] == "keys" || items[i].toLowerCase() == prefix) {
        items.splice(i, 1);
        i--;
      }
    }
    //Upsert updates an existing row or creates a new row if one was not found.
    const user = await prisma.keys.upsert({
      where: { name: message.author.username },
      update: {
        name: message.author.username,
        dungeon: items[0],
        level: parseInt(items[1]),
      },
      create: {
        name: message.author.username,
        dungeon: items[0],
        level: parseInt(items[1]),
      },
    });
    return message.channel.send("Noted");
  }
};
