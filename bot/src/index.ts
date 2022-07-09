/// <reference path="./types/discord.d.ts" />
const fs = require("node:fs");
const path = require("node:path");
// Require the necessary discord.js classes
import {
  Client,
  Collection,
  Intents,
  Interaction,
  Message,
  Guild,
  TextChannel,
} from "discord.js";
import { token } from "./config.json";

var CronJob = require("cron").CronJob;

// Create a new client instance
const client = new Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (message: Message) => {
  if (message.content.toLowerCase().includes("fred")) {
    // message.react("🤔");
    if (message.content.includes("listemoji")) {
      const emojiList = message?.guild?.emojis.cache
        .map((e) => `${e}`)
        .join("");
      message.channel.send(emojiList || "");
    }
  }
});

// Login to Discord with your client's token
client.login(token);
