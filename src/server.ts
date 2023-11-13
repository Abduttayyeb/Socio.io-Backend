import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

export default server;
