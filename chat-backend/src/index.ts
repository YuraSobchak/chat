import express from 'express';
import socket from 'socket.io';
import dotenv from 'dotenv';
import { createServer } from "http";

import './core/db';
import createRoutes from "./core/routes";

const app = express();
const http = createServer(app);
const io = socket(http);

createRoutes(app, io);

dotenv.config();

io.on("connection", function (socket: any) {
    console.log("a user connected");
});

http.listen(process.env.PORT, function () {
    console.log(`Server: http://localhost:${process.env.PORT}`)
});
