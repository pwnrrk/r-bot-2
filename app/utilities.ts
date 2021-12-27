import { CommandInteraction } from "discord.js";
import { routes } from "../routes/routes";
import fs from "fs";
import path from "path";

export function getMusicList(): string[] {
  const files = fs.readdirSync(
    path.join(path.resolve(), "storage/alternative")
  );
  return files;
}
export function globalErrorHandler(error: Error) {
  console.trace(error);
}
export function commandHandler(interaction: CommandInteraction) {
  const route = routes.find((x) => x.name === interaction.commandName);
  if (!route) return;
  route?.action(interaction);
}
