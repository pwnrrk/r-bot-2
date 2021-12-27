import { createAudioResource } from "@discordjs/voice";
import { CommandInteraction } from "discord.js";
import app from "../..";

export async function list(interaction: CommandInteraction) {
  await interaction.reply(`Total ${app.musics.length} song`);
}
export function getNextResource() {
  const resource = createAudioResource("");
  return resource;
}
