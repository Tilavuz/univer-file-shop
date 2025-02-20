import express, { Application, json } from "express";
import { connectdb } from "./utils/connect-db";
import path from "path";
import cors from "cors";

const app: Application = express();

app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bluebird-fancy-painfully.ngrok-free.app",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectdb();
import "./bot/bot";

// Router
import router from "./routers/router";
app.use("/api", router);

export default app;
