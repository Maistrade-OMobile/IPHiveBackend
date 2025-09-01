import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

export default app;
