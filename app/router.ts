import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Guild, CommandInteraction } from "discord.js";

export interface Command {
  name: string;
  description: string;
}

interface Action {
  (interaction: CommandInteraction): void;
}

export interface Route {
  name: string;
  action: Action;
}

export class CommandRouter {
  rest: REST;
  constructor() {
    this.rest = new REST({ version: "9" }).setToken(
      process.env.CLIENT_TOKEN as string
    );
  }
  async register(commands: Command[], guilds: Guild[]) {
    try {
      console.log("Started refreshing application (/) commands.");
      guilds.forEach(async (guild) => {
        await this.rest.put(
          Routes.applicationGuildCommands(
            process.env.CLIENT_ID as string,
            guild.id
          ),
          {
            body: commands,
          }
        );
      });
      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  }
}
