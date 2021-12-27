import { Client, Intents } from "discord.js";
import { AudioPlayer, createAudioPlayer } from "@discordjs/voice";
import { commands } from "../routes/routes";
import { CommandRouter } from "./router";
import { commandHandler, getMusicList } from "./utilities";

export default class App extends Client {
  musics: string[];
  player: AudioPlayer;
  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS] });
    this.musics = getMusicList();
    this.player = createAudioPlayer();
  }
  start() {
    this.on("ready", () => {
      console.log(`Logged in as ${this.user?.tag}`);
      const commandRouter = new CommandRouter();
      commandRouter.register(
        commands,
        this.guilds.cache.map((guild) => guild)
      );
      this.listen();
    });
    this.login(process.env.CLIENT_TOKEN);
  }
  listen() {
    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      commandHandler(interaction);
    });
  }
}
