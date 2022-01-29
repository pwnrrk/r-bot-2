import { ping } from "../app/functions/general";
import {
  getNowPlaying,
  getQues,
  joinMusic,
  leaveVoice,
  list,
} from "../app/functions/music";
import { Command, Route } from "../app/router";

export const commands: Command[] = [
  { name: "ping", description: "Response with pong" },
  { name: "total", description: "Display total song" },
  { name: "join", description: "Join Music" },
  { name: "leave", description: "Leave voice" },
  { name: "now", description: "Show now playing song" },
  { name: "que", description: "Show que" },
];

export const routes: Route[] = [
  { name: "ping", action: ping },
  { name: "total", action: list },
  { name: "join", action: joinMusic },
  { name: "leave", action: leaveVoice },
  { name: "now", action: getNowPlaying },
  { name: "que", action: getQues },
];
