import { CommandInteraction } from "discord.js";
import fs from "fs";
import path from "path";

export async function list(interaction: CommandInteraction) {
  const files = fs.readdirSync(path.join(path.resolve(), "storage"));
  await interaction.reply(`Total ${files.length} song`);
}
