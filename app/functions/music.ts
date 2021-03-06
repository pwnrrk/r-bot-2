import {
  AudioPlayerStatus,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import { CommandInteraction, Guild, GuildMember } from "discord.js";
import app from "../..";
import Music from "../interfaces/music";
import { getMusicList } from "../utilities";

export async function list(interaction: CommandInteraction) {
  await interaction.reply(`Total ${app.musics?.length} song`);
}

function getNextSong() {
  let nextSong = app.musics[0];
  if (!app.nowPlaying) return nextSong;
  if (app.nowPlaying.id >= app.musics.length) return nextSong;
  nextSong = app.musics[app.nowPlaying.id];
  return nextSong;
}
function setNowPlaying(music: Music) {
  app.nowPlaying = music;
  app.user?.setActivity({
    name: `${app.nowPlaying?.title} by ${app.nowPlaying.artist}`,
    type: "LISTENING",
  });
  console.log(`Playing ${app.nowPlaying.title} by ${app.nowPlaying.artist}`);
}
export function startMusic() {
  const nextSong = getNextSong();
  const resource = createAudioResource(nextSong.path);
  app.player.play(resource);
  setNowPlaying(nextSong);
  scheduleRefresh();

  app.player.on("error", (error) => {
    console.trace(error);
  });

  app.player.on(AudioPlayerStatus.Idle, async () => {
    if (app.nowPlaying && app.nowPlaying.id >= app.musics.length)
      await refreshMusicList();
    const nextSong = getNextSong();
    const resource = createAudioResource(nextSong.path);
    app.player.play(resource);
    setNowPlaying(nextSong);
  });
}
export async function joinMusic(interaction: CommandInteraction) {
  const guild: Guild = app.guilds.cache.get(interaction.guildId) as Guild;
  const member: GuildMember = guild.members.cache.get(
    interaction.member.user.id
  ) as GuildMember;
  if (!member.voice.channel?.id)
    return await interaction.reply("Need to connect voice channel first!");
  const connection = joinVoiceChannel({
    channelId: member.voice.channel?.id as string,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });
  connection.subscribe(app.player);
  await interaction.reply("Connected");
}

export async function leaveVoice(interaction: CommandInteraction) {
  const connection = getVoiceConnection(interaction.guildId);
  connection?.destroy();
  await interaction.reply("Bye");
}

export async function refreshMusicList() {
  app.musics = await getMusicList();
}

export async function getNowPlaying(interaction: CommandInteraction) {
  await interaction.reply(
    `Now playing ${app.nowPlaying?.title} by ${app.nowPlaying?.artist}`
  );
}

export async function getQues(interaction: CommandInteraction) {
  const nowId = app.nowPlaying?.id as number;
  await interaction.reply(
    `Next ${app.musics[nowId].title} by ${app.musics[nowId].artist}`
  );
}

function scheduleRefresh() {
  setInterval(refreshMusicList, 1000 * 60 * 60);
}
