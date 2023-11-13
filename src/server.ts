import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const server = http.createServer(app);

export default server;
