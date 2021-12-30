import express from "express";
import { refreshMusicList } from "./functions/music";

export default class Http {
  instance: express.Express;
  constructor() {
    this.instance = express();
  }
  start() {
    this.instance.get("/", (request, response) => {
      response.send("Bot are running");
    });

    this.instance.get("/api/refresh", async (request, response) => {
      try {
        await refreshMusicList();
        response.json({
          status: "ok",
        });
      } catch (error) {
        response
          .json({
            status: "failed",
          })
          .status(500);
        console.trace(error);
      }
    });

    this.instance.listen("3000", () => {
      console.log("Server running on http://localhost:3000");
    });
  }
}
