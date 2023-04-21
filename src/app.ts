import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./index";
import { connectToDB } from "./connection";
import http from "http";
import { Server } from "socket.io";

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
connectToDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://nivprojectclient.onrender.com"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const roomId: string = socket.handshake.query.roomId as string;
  await socket.join(roomId);
  console.log(io.sockets.adapter.rooms);

  socket.to(roomId).emit("connected", {
    roomSize: io.sockets.adapter.rooms.get(roomId)?.size,
  });

  socket.emit("roomSize", {
    roomSize: io.sockets.adapter.rooms.get(roomId)?.size,
  });

  socket.on("code", ({ code }) => {
    console.log(`Received code from ${socket.id}`);
    socket.to(roomId).emit("code", { code, senderId: socket.id });
    console.log();
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    socket.leave(roomId);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
