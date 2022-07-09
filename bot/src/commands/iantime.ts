import { CommandInteraction } from "discord.js";

import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("iantime")
    .setDescription("What time is it for Ian?"),
  async execute(interaction: CommandInteraction) {
    let options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Oslo",
    } as const;
    let date = new Date();
    await interaction.reply({
      content: `It is ${date.toLocaleString("en-US", options)} in Sweden`,
      ephemeral: true,
    });
  },
};
