import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import loggerMiddleware from "./middlewares/logger";
import logger from "./utils/logger";
import cors from "cors";
import setupSwagger from './utils/swagger';

import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
export { io };

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);
setupSwagger(app);
app.use(routes);

io.on('connection', (socket) => {
  logger.info(`Novo cliente conectado: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    logger.info(`Socket ${socket.id} entrou na sala ${roomId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Cliente desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@backend.k11ic.mongodb.net/?retryWrites=true&w=majority&appName=Backend`
  )
  .then(() => {
    logger.info("Connected to MongoDB");
    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB:", err);
  });