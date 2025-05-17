import { Server } from "socket.io";

export function setupSocketIO(io: Server) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (roomData) => {
      console.log(`User ${socket.id} joining room:`, roomData);
      const playerName = roomData.player2 || roomData.player1;

      socket.join(roomData.roomId);
      console.log(`User ${socket.id} joined room ${roomData.roomId}`);

      io.to(roomData.roomId).emit("player_joined", {
        message: `${playerName} entrou na sala`
      });

      io.to(roomData.roomId).emit("flash_screen", {
        flashType: roomData.flashType
      });

      io.to(roomData.roomId).emit("game_updated", {
        room: roomData,
        message: `${playerName} clicou no botão ${roomData.colorChosenByPlayer}`,
        correct: true
      });

      io.emit("receive_data", roomData);
    });
  });
}