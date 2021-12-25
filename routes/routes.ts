import { ping } from "../app/functions/general";
import { Command, Route } from "../app/router";

export const commands: Command[] = [
  { name: "ping", description: "Response with pong" },
];

export const routes: Route[] = [{ name: "ping", action: ping }];
