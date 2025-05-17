interface Room {
  _id: string;
  roomName: string;
  player1: string;
  player2: string | null;
  currentPlayer: string;
  gameSequence: string[];
  playersSequence: string[];
  round: number;
}

interface GameUpdate {
  room: Room;
  message: string;
  correct?: boolean;
}

interface SocketMessage {
  player2: string;
  message: string;
}