import { ping } from "../app/functions/general";
import { list } from "../app/functions/music";
import { Command, Route } from "../app/router";

export const commands: Command[] = [
  { name: "ping", description: "Response with pong" },
  { name: "total", description: "Display total song" },
];

export const routes: Route[] = [
  { name: "ping", action: ping },
  { name: "total", action: list },
];
