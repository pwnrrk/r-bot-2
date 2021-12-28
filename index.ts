import App from "./app/app";
import dotenv from "dotenv";
import { globalErrorHandler } from "./app/utilities";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

process.on("unhandledRejection", (error: Error) => {
  globalErrorHandler(error);
});

process.on("uncaughtException", (error) => {
  globalErrorHandler(error);
});

const app = new App();
app.start();
export default app;
