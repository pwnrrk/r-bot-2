import { CommandInteraction } from "discord.js";

export async function ping(interaction: CommandInteraction) {
  await interaction.reply("Pong!");
}
