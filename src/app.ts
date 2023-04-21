// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import router from "./index";
// import { connectToDB } from "./connection";
// require("dotenv").config();

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(router);
// connectToDB();
// app.listen(process.env.PORT, () =>
//   console.log(`Listening on http://localhost:${process.env.PORT}`)
// );

//////////socket/////////////
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const roomId: string = socket.handshake.query.roomId as string;
  socket.join(roomId);
  console.log(io.sockets.adapter.rooms);
  
 
  socket.on("code", ({ code }) => {
    console.log(`Received code from ${socket.id}`);
    socket.to(roomId).emit("code", { code, senderId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
    socket.leave(roomId);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
