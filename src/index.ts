import fs from 'node:fs';
import path from 'node:path';
import { Client, Intents, Interaction } from "discord.js";
import { prefix, token } from "./config.json";
import { pubSub, ping, imageSearch, location, keys } from "./commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag ?? "<anonymous>"}!`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction?.guild?.name}\nTotal members: ${interaction?.guild?.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

// client.on("message", (message: Discord.Message) => {
//   const lowerMessage = message.content.toLowerCase();
//   if (lowerMessage.split(" ")[0] === prefix) {
//     var args = lowerMessage.substring(4).split(" ");
//     args = args.splice(1);
//     var cmd = args[0];
//     switch (cmd) {
//       // fred ping
//       case "ping":
//         ping(message);
//         break;
//       case "pubsub":
//         //Are they on sale?
//         pubSub(message);
//         break;
//       case "image":
//       case "animate":
//         imageSearch(message);
//         break;
//       case "where":
//         location(message);
//         break;
//       case "keys":
//         keys(message);
//         break;
//     }
//   } else if (message.channel.type === "dm") {
//     var args = lowerMessage.split(" ");
//     var cmd = args[0];
//     switch (cmd) {
//       // fred ping
//       case "ping":
//         ping(message);
//         break;
//       case "pubsub":
//         pubSub(message);
//         break;
//       case "image":
//       case "animate":
//         imageSearch(message);
//         break;
//       case "where":
//         location(message);
//         break;
//       case "keys":
//         keys(message);
//         break;
//     }
//   }
// });

client.login(token);
