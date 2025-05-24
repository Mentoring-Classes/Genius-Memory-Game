import CoopRoom from "../models/CoopRoom";
import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { COOP_ROOM_MESSAGES, USER_MESSAGES } from "../consts/Messages";

import User from "../models/User";

export const createRoom = async (req: AuthenticatedRequest, res: Response) => {
  const { roomName } = req.body;

  if (!roomName) {
    return res.status(422).json({ msg: COOP_ROOM_MESSAGES.ROOM_NAME_REQUIRED });
  }

  const roomExists = await CoopRoom.findOne({ roomName });

  if (roomExists) {
    return res.status(422).json({ msg: COOP_ROOM_MESSAGES.ROOM_ALREADY_EXISTS });
  }
  const availableColors = ['Red', 'Yellow', 'Green', 'Blue'];
  const randomNumber = Math.floor(4 * Math.random());
  const selectedColor = availableColors[randomNumber];

  const room = new CoopRoom({
    roomName,
    player1: req.user.userName,
    player2: null,
    currentPlayer: req.user.userName,
    gameColorChoices: [selectedColor],
    playersColorsSequence: [],
    round: 1
  });

  try {
    await room.save();
    res.status(201).json({ msg: COOP_ROOM_MESSAGES.ROOM_SAVED_SUCCESSFULLY, room });
  } catch (error) {
    res.status(500).json({ msg: COOP_ROOM_MESSAGES.ERROR_SAVING_ROOM, error });
  }
};

export const getRoom = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const room = await CoopRoom.findById(id);

    return res.json(room);

  } catch (error) {
    return res.status(500).json({ msg: COOP_ROOM_MESSAGES.ROOM_NOT_FOUND, error });
  }
};

export const joinRoom = async (req: AuthenticatedRequest, res: Response) => {
  const { roomName } = req.body;
  const userId = req.user.id;

  try {
    const room = await CoopRoom.findOne({ roomName });
    const user = await User.findById(userId);

    if (!room) return res.status(404).json({ message: COOP_ROOM_MESSAGES.ROOM_NOT_FOUND });
    if (!user) return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });

    if (!room.player2) {
      room.player2 = user.userName;

      await room.save();

      return res.json({ message: COOP_ROOM_MESSAGES.JOIN_ROOM_SUCCESS, room });
    } else {
      return res.status(400).json({ message: COOP_ROOM_MESSAGES.ROOM_ALREADY_FULL });
    }

  } catch (error) {
    return res.status(500).json({ message: "Erro ao entrar na sala", error });
  }
};

export const patchRoom = async (req: AuthenticatedRequest, res: Response) => {
  const { roomName, colorChosenByPlayer } = req.body;
  const userId = req.user.id;

  try {
    const room = await CoopRoom.findOne({ roomName });
    const user = await User.findById(userId);

    if (!room) return res.status(404).json({ message: COOP_ROOM_MESSAGES.ROOM_NOT_FOUND });
    if (!user) return res.status(404).json({ message: USER_MESSAGES.USER_NOT_FOUND });
    const availableColors = ['Red', 'Yellow', 'Green', 'Blue'];
    const randomNumber = Math.floor(4 * Math.random());

    room.playersColorsSequence = room.playersColorsSequence.concat(colorChosenByPlayer);
    const currentIndex = room.playersColorsSequence.length - 1;
    const correctColor = colorChosenByPlayer === room.gameColorChoices[currentIndex];

    if (correctColor) {
      if (room.playersColorsSequence.length === room.gameColorChoices.length) {
        const selectedColor = availableColors[randomNumber];
        room.gameColorChoices = room.gameColorChoices.concat(selectedColor);
        room.playersColorsSequence = [];
        room.round = room.round + 1;
        await room.save();
        return res.json({ message: "Rodada completa", room, correct: true });
      }
      await room.save();
      return res.json({ message: "Cor correta", room, correct: true });
    } else {
      if (room.round !== 1) {
        room.round = 1;
        room.gameColorChoices = [];
        room.playersColorsSequence = [];
        
        const selectedColor = availableColors[randomNumber];
        room.gameColorChoices = [selectedColor];
      } else {
        room.round = 1;
        room.gameColorChoices = [room.gameColorChoices[0]];
        room.playersColorsSequence = [];
      }
      await room.save();
      return res.json({ message: "Atualizado", room });

    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao entrar na sala", error });
  }
}