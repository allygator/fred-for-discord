import Discord from "discord.js";

/**
 * Responds to Ping with a Pong
 * @param message
 */
export function ping(message: Discord.Message) {
  return message.channel.send("Pong");
}
// import { Interaction } from "discord.js";
// import { SlashCommandBuilder } from '@discordjs/builders';

// export default {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction: Interaction) {
// 		await interaction.reply('Pong!');
// 	},
// };
