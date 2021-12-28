import App from "./app/app";
import Http from "./app/http";
import dotenv from "dotenv";
import { globalErrorHandler } from "./app/utilities";

dotenv.config();

process.on("unhandledRejection", (error: Error) => {
  globalErrorHandler(error);
});

process.on("uncaughtException", (error) => {
  globalErrorHandler(error);
});

const http = new Http();
http.start();

const app = new App();
app.start();
export default app;
