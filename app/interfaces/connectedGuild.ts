import { VoiceConnection } from "@discordjs/voice";
import { Guild } from "discord.js";

export default interface ConnecetedGuild {
  guild: Guild;
  connection: VoiceConnection;
}
