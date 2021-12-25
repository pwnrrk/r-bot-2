import { CommandInteraction } from "discord.js";
import { routes } from "../routes/routes";

export function globalErrorHandler(error: Error) {
  console.trace(error);
}
export function commandHandler(interaction: CommandInteraction) {
  const route = routes.find((x) => x.name === interaction.commandName);
  if (!route) return;
  route?.action(interaction);
}
