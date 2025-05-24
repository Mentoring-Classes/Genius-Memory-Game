import { Server } from "socket.io";

interface RoomData {
  roomId: string;
  player1: string;
  player2: string;
  gameColorChoices: string[];
  playersColorsSequence: string[];
  round: number;
}

export function setupSocketIO(io: Server) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("joinRoom", (roomData: RoomData) => {
      console.log(`User ${socket.id} joining room:`, roomData);
      const playerName = roomData.player2 || roomData.player1;

      socket.join(roomData.roomId);
      console.log(`User ${socket.id} joined room ${roomData.roomId}`);

      io.to(roomData.roomId).emit("player_joined", {
        message: `${playerName} entrou na sala`
      });

      io.to(roomData.roomId).emit("receive_data", roomData);
    });    
    
    socket.on("playerClicked", (data) => {
      io.to(data.room.roomId).emit("roomUpdated", {
        message: `${data.userName} clicou ${data.colorChosenByPlayer}`,
        room: data.room,
        clicked: true
      });
      
      io.to(data.room.roomId).emit("receive_data", data.room);
    });
  });
}