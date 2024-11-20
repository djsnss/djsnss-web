import express from "express";
import ConnectMongoDb from "./config/connection.js";
import env from "dotenv";
import cors from "cors";

env.config();
const PORT = process.env.Port;
const URL = process.env.Connect_URI;
const app = express();

ConnectMongoDb(URL);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server connected at PORT ${PORT}`);
  });
