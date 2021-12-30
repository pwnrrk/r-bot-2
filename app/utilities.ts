import { CommandInteraction } from "discord.js";
import { routes } from "../routes/routes";
import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";
import Music from "./interfaces/music";

export async function getMusicList() {
  console.log("Loading music list");
  const files = fs.readdirSync(path.join(path.resolve(), "storage"));
  const shuffled = shuffleFiles(files);
  const musics: Music[] = [];
  for (let i = 0; i < shuffled.length; i++) {
    const file = shuffled[i];
    const musicPath = path.join(path.resolve(), `storage/${file}`);
    try {
      const metadata = await parseFile(musicPath);
      const music: Music = {
        id: i + 1,
        title: metadata.common.title as string,
        album: metadata.common.album as string,
        artist: metadata.common.artist as string,
        path: musicPath,
      };
      musics.push(music);
    } catch (error) {
      console.trace(error);
    }
  }
  console.log("Music load successfully");
  return musics;
}
export function globalErrorHandler(error: Error) {
  console.trace(error);
}
export function commandHandler(interaction: CommandInteraction) {
  const route = routes.find((x) => x.name === interaction.commandName);
  if (!route) return;
  route?.action(interaction);
}

function shuffleFiles(array: Array<string>) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
