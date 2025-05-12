import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import loggerMiddleware from "./middlewares/logger";
import logger from "./utils/logger";
import cors from "cors";
import setupSwagger from './utils/swagger';
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);
setupSwagger(app);
app.use(routes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", (roomData) => {
    console.log(`User ${socket.id} joining room:`, roomData);
    const playerName = roomData.player2 || roomData.player1;
    
    socket.join(roomData.roomId);
    console.log(`User ${socket.id} joined room ${roomData.roomId}`);
    
    io.to(roomData.roomId).emit("player_joined", {
      message: `${playerName} entrou na sala!`
    });

    io.to(roomData.roomId).emit("flash_screen", {
      flashType: roomData.flashType
    });
    io.emit("receive_message", roomData);
  });
})

const PORT = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@backend.k11ic.mongodb.net/?retryWrites=true&w=majority&appName=Backend`
  )
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB:", err);
  });

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});