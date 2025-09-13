import "dotenv/config"
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./src/public")); //For testing purposes

app.use("/", routes);

export default app;
