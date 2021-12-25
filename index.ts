import App from "./app/app";
import dotenv from "dotenv";
import { globalErrorHandler } from "./app/utilities";

dotenv.config();

process.on("unhandledRejection", (error: Error) => {
  globalErrorHandler(error);
});

const app = new App();
app.start();
