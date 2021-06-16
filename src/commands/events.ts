import Discord from "discord.js";
import { PrismaClient } from "@prisma/client";
import { prefix } from "../config.json";

const prisma = new PrismaClient();

/**
 * Registers email address, or updates current address. Adds user and email address to database
 * @param message
 */
export const register = async (message: Discord.Message) => {
  const items = message.content.replace(/[^\w\s\-]/gi, "").split(" ");
  let commandIndex = items.indexOf("register") + 1;
  const user = await prisma.users.upsert({
    where: { name: message.author.id },
    update: {
      name: message.author.id,
      email: items[commandIndex],
    },
    create: {
      name: message.author.id,
      email: items[commandIndex],
    },
  });
  return message.channel.send(
    "Registration Complete. Email address " + items[commandIndex] + " added."
  );
};

/**
 * Unregisters email address, removes user and email address from database
 * @param message
 */
export const unregister = async (message: Discord.Message) => {
  await prisma.users.delete({ where: { name: message.author.id } });
  return message.channel.send("Sorry to see you go. Email address removed.");
};

/**
 * Returns registered email address
 * @param message
 */
export const address = async (message: Discord.Message) => {
  const user = await prisma.users.findUnique({
    where: {
      name: message.author.id,
    },
  });
  if (user === null) {
    return message.channel.send("Looks like you arent registered!");
  } else {
    return message.channel.send(" Email address " + user.email + " found.");
  }
};

/**
 * Adds user to calendar event
 * @param message
 * @param user
 */
export const addUser = async (
  message: Discord.Message,
  user: Discord.PartialUser | Discord.User
) => {
  console.log("user added");
};

/**
 * Removes user from calendar event
 * @param message
 */
export const removeUser = async (message: Discord.Message) => {};

/**
 * Add event to calendar
 * @param message
 */
export const addEvent = async (message: Discord.Message) => {};
