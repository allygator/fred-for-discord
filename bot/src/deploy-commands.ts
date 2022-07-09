const fs = require("node:fs");
const path = require("node:path");
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "./config.json";

const commands = [];

const commandsPath = path.join(__dirname, "commands");
console.log(commandsPath);
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith(".js"));

console.log(commandFiles);

console.log(clientId);

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then((resp) => {
    console.log(resp);
    console.log("Successfully registered application commands.");
  })
  .catch(console.error);
