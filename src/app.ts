import express, { Application, json } from "express";
import { connectdb } from "./utils/connect-db";

const app: Application = express();

app.use(json());

connectdb();
import "./bot/bot";

export default app;
