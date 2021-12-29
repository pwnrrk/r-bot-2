import { Client, Intents } from "discord.js";
import {
  AudioPlayer,
  createAudioPlayer,
  NoSubscriberBehavior,
} from "@discordjs/voice";
import { commands } from "../routes/routes";
import { CommandRouter } from "./router";
import { commandHandler, getMusicList } from "./utilities";
import Music from "./interfaces/music";
import { startMusic } from "./functions/music";
import ConnecetedGuild from "./interfaces/connectedGuild";

export default class App extends Client {
  musics: Music[];
  nowPlaying?: Music;
  player: AudioPlayer;
  connectedGuild: ConnecetedGuild[];
  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
    });
    this.player = createAudioPlayer({
      behaviors: { noSubscriber: NoSubscriberBehavior.Play },
    });
    this.musics = [];
    this.connectedGuild = [];
  }
  async start() {
    this.on("ready", () => {
      console.log(`Logged in as ${this.user?.tag}`);
      const commandRouter = new CommandRouter();
      commandRouter.register(
        commands,
        this.guilds.cache.map((guild) => guild)
      );
      startMusic();
    });

    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      commandHandler(interaction);
    });

    this.on("guildCreate", (guild) => {
      const commandRouter = new CommandRouter();
      commandRouter.registerOne(commands, guild.id);
    });

    this.musics = await getMusicList();
    this.login(process.env.CLIENT_TOKEN);
  }
}
